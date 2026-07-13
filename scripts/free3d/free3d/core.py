"""Core generation logic — usable directly (CLI) or wrapped by the MCP server.

Pipeline (all compute runs on Hugging Face's free ZeroGPU, not this machine):

    text prompt --(FLUX.1-schnell Space)--> PNG --(TRELLIS Space)--> GLB
    product image ------------------------------(TRELLIS Space)--> GLB

Then install_to_landing() drops the GLB into public/models/<name>/model.glb.

Requires a free HF token (HF_TOKEN) — read from the environment or the repo's
.env.local (single source of truth). Create one at:
    https://huggingface.co/settings/tokens  (a "read" token is enough)
"""

from __future__ import annotations

import os
import shutil
import time
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from gradio_client import Client, handle_file

# ---------------------------------------------------------------------------
# Paths & config
# ---------------------------------------------------------------------------

# scripts/free3d/free3d/core.py -> repo root is three parents up.
REPO_ROOT = Path(__file__).resolve().parents[3]
PUBLIC_MODELS = REPO_ROOT / "public" / "models"
RUN_DIR = Path(__file__).resolve().parents[1] / ".run"

# Image -> 3D. TRELLIS (Microsoft, MIT-licensed code). The community mirror
# exposes a one-shot /generate_and_extract_glb endpoint.
DEFAULT_TRELLIS_SPACE = "trellis-community/TRELLIS"
TRELLIS_FALLBACK_SPACES = [
    "JeffreyXiang/TRELLIS",
    "microsoft/TRELLIS",
]

# Text -> image (only needed for text->3D). FLUX.1-schnell (Apache-2.0).
DEFAULT_FLUX_SPACE = "black-forest-labs/FLUX.1-schnell"
FLUX_FALLBACK_SPACES = [
    "black-forest-labs/FLUX.1-schnell",
]


def _token() -> Optional[str]:
    """HF token from env, falling back to the repo .env.local."""
    if os.environ.get("HF_TOKEN"):
        return os.environ["HF_TOKEN"]
    load_dotenv(REPO_ROOT / ".env.local")
    return os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_TOKEN")


def _require_token() -> str:
    tok = _token()
    if not tok:
        raise RuntimeError(
            "HF_TOKEN not set. Create a free 'read' token at "
            "https://huggingface.co/settings/tokens and add HF_TOKEN=hf_... to "
            f"{REPO_ROOT / '.env.local'}"
        )
    return tok


def _client(space: str) -> Client:
    """Build a client. The token kwarg name differs across gradio_client majors
    (`hf_token` on 1.x, `token` on 2.x), so try both."""
    tok = _require_token()
    try:
        return Client(space, hf_token=tok, verbose=False)
    except TypeError:
        return Client(space, token=tok, verbose=False)


def _extract_filepath(value) -> Optional[str]:
    """Gradio outputs vary (str path, FileData dict, {'value': ...}). Normalise."""
    if value is None:
        return None
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        for key in ("path", "value", "name", "url"):
            v = value.get(key)
            if isinstance(v, str):
                return v
        inner = value.get("value")
        if isinstance(inner, dict):
            return _extract_filepath(inner)
    if isinstance(value, (list, tuple)) and value:
        return _extract_filepath(value[0])
    return None


# ---------------------------------------------------------------------------
# Text -> image
# ---------------------------------------------------------------------------

def text_to_image(
    prompt: str,
    out_dir: Path | str = RUN_DIR,
    *,
    space: str = DEFAULT_FLUX_SPACE,
    width: int = 1024,
    height: int = 1024,
    steps: int = 4,
    seed: int = 0,
    log=print,
) -> Path:
    """Generate a PNG from a text prompt via a free FLUX.1-schnell Space."""
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    log(f"[free3d] text->image on {space}: {prompt!r}")
    client = _client(space)
    result = client.predict(
        prompt=prompt,
        seed=float(seed),
        randomize_seed=(seed == 0),
        width=float(width),
        height=float(height),
        num_inference_steps=float(steps),
        api_name="/infer",
    )
    img_path = _extract_filepath(result[0] if isinstance(result, (list, tuple)) else result)
    if not img_path or not Path(img_path).exists():
        raise RuntimeError(f"text_to_image returned no usable image: {result!r}")
    dest = out_dir / f"prompt_{int(time.time())}.png"
    shutil.copy(img_path, dest)
    log(f"[free3d] image saved -> {dest}")
    return dest


# ---------------------------------------------------------------------------
# Image -> 3D
# ---------------------------------------------------------------------------

def image_to_3d(
    image_path: Path | str,
    out_dir: Path | str = RUN_DIR,
    *,
    space: str = DEFAULT_TRELLIS_SPACE,
    seed: int = 0,
    ss_guidance_strength: float = 7.5,
    ss_sampling_steps: int = 12,
    slat_guidance_strength: float = 3.0,
    slat_sampling_steps: int = 12,
    mesh_simplify: float = 0.95,
    texture_size: int = 1024,
    log=print,
) -> Path:
    """Generate a GLB from a single image via a free TRELLIS Space.

    TRELLIS does mesh simplification (`mesh_simplify`, higher = fewer faces) and
    texture sizing (`texture_size`) on its side, so the GLB is already web-ready.
    """
    image_path = Path(image_path)
    if not image_path.exists():
        raise FileNotFoundError(image_path)
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    log(f"[free3d] image->3D on {space} (this uses ZeroGPU, ~2-5 min)...")
    client = _client(space)

    # TRELLIS requires: start a session, then preprocess (background removal),
    # then feed the *preprocessed* image to generation.
    try:
        client.predict(api_name="/start_session")
    except Exception:
        pass
    try:
        image_input = client.predict(image=handle_file(str(image_path)), api_name="/preprocess_image")
    except Exception:
        image_input = str(image_path)

    result = client.predict(
        image=handle_file(str(image_input)),
        multiimages=[],
        seed=float(seed),
        ss_guidance_strength=float(ss_guidance_strength),
        ss_sampling_steps=float(ss_sampling_steps),
        slat_guidance_strength=float(slat_guidance_strength),
        slat_sampling_steps=float(slat_sampling_steps),
        multiimage_algo="stochastic",
        mesh_simplify=float(mesh_simplify),
        texture_size=float(texture_size),
        api_name="/generate_and_extract_glb",
    )

    # Endpoint returns (preview_video, litmodel3d, download_glb). Prefer the GLB.
    glb = None
    if isinstance(result, (list, tuple)):
        for item in reversed(result):  # download button is last
            candidate = _extract_filepath(item)
            if candidate and str(candidate).lower().endswith(".glb"):
                glb = candidate
                break
        if glb is None:
            glb = _extract_filepath(result)
    else:
        glb = _extract_filepath(result)

    if not glb or not Path(glb).exists():
        raise RuntimeError(f"image_to_3d returned no usable GLB: {result!r}")

    dest = out_dir / f"model_{int(time.time())}.glb"
    shutil.copy(glb, dest)
    log(f"[free3d] GLB saved -> {dest} ({dest.stat().st_size // 1024} KB)")
    return dest


def text_to_3d(prompt: str, out_dir: Path | str = RUN_DIR, *, log=print, **kwargs) -> Path:
    """text -> image -> 3D. Higher quota cost than image_to_3d; prefer a real photo."""
    img = text_to_image(prompt, out_dir, log=log)
    return image_to_3d(img, out_dir, log=log, **kwargs)


# ---------------------------------------------------------------------------
# Install into the landing
# ---------------------------------------------------------------------------

def install_to_landing(glb_path: Path | str, name: str, *, log=print) -> Path:
    """Copy a GLB to public/models/<name>/model.glb (served by React Three Fiber)."""
    glb_path = Path(glb_path)
    if not glb_path.exists():
        raise FileNotFoundError(glb_path)
    safe = "".join(c for c in name if c.isalnum() or c in ("-", "_")).strip("-_") or "model"
    dest_dir = PUBLIC_MODELS / safe
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / "model.glb"
    shutil.copy(glb_path, dest)
    public_url = f"/models/{safe}/model.glb"
    log(f"[free3d] installed -> {dest}  (served at {public_url})")
    return dest
