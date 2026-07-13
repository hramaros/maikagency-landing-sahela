"""MCP server exposing the free 3D pipeline to Claude.

Declared in the repo's .mcp.json as `free3d`. Generation runs on Hugging Face's
free ZeroGPU (TRELLIS / FLUX.1-schnell) — no paid API, no local GPU. A GLB is
produced and (optionally) installed into public/models/<name>/model.glb for the
React Three Fiber hero.

Tools are long-running (a real ZeroGPU job is ~2-5 min plus queue time).
"""

from __future__ import annotations

from mcp.server.fastmcp import FastMCP

from . import core

mcp = FastMCP("free3d")


@mcp.tool()
def check_setup() -> str:
    """Verify the HF token is present and the default Spaces are reachable.

    Call this first if generation fails — it distinguishes a missing token from a
    Space being temporarily down.
    """
    lines = []
    try:
        core._require_token()
        lines.append("HF_TOKEN: found")
    except RuntimeError as e:
        return f"HF_TOKEN: MISSING — {e}"
    for space in [core.DEFAULT_TRELLIS_SPACE, core.DEFAULT_FLUX_SPACE]:
        try:
            core._client(space)
            lines.append(f"reachable: {space}")
        except Exception as e:  # noqa: BLE001
            lines.append(f"UNREACHABLE: {space} — {type(e).__name__}: {e}")
    return "\n".join(lines)


@mcp.tool()
def list_spaces() -> str:
    """List the Hugging Face Spaces used, with fallbacks (swap if one is down)."""
    return (
        "image->3D (TRELLIS, MIT code):\n"
        f"  default:   {core.DEFAULT_TRELLIS_SPACE}\n"
        f"  fallbacks: {', '.join(core.TRELLIS_FALLBACK_SPACES)}\n"
        "text->image (FLUX.1-schnell, Apache-2.0):\n"
        f"  default:   {core.DEFAULT_FLUX_SPACE}\n"
        f"  fallbacks: {', '.join(core.FLUX_FALLBACK_SPACES)}"
    )


@mcp.tool()
def generate_from_image(
    image_path: str,
    name: str = "",
    mesh_simplify: float = 0.95,
    texture_size: int = 1024,
    trellis_space: str = core.DEFAULT_TRELLIS_SPACE,
) -> str:
    """Generate a 3D model (GLB) from a product photo via TRELLIS (free ZeroGPU).

    Best quality / lowest quota path. Use a clean, well-lit photo of a single
    object on a plain background.

    Args:
        image_path: Local path to the source image.
        name: If given, install the GLB to public/models/<name>/model.glb.
        mesh_simplify: 0-1, higher = fewer faces (lighter for web). Default 0.95.
        texture_size: Baked texture resolution (px). Default 1024.
        trellis_space: Override the TRELLIS Space (see list_spaces).

    Returns a human-readable status with the GLB path (and public URL if installed).
    Takes ~2-5 min plus ZeroGPU queue time.
    """
    logs: list[str] = []
    glb = core.image_to_3d(
        image_path,
        space=trellis_space,
        mesh_simplify=mesh_simplify,
        texture_size=texture_size,
        log=logs.append,
    )
    out = [f"GLB generated: {glb} ({glb.stat().st_size // 1024} KB)"]
    if name:
        dest = core.install_to_landing(glb, name, log=logs.append)
        safe = dest.parent.name
        out.append(f"Installed for the landing: served at /models/{safe}/model.glb")
        out.append(f"Point Scene3D at that path (useGLTF).")
    return "\n".join(out + logs)


@mcp.tool()
def generate_from_text(
    prompt: str,
    name: str = "",
    mesh_simplify: float = 0.95,
    texture_size: int = 1024,
) -> str:
    """Generate a 3D model (GLB) from a text prompt: text->image (FLUX)->3D (TRELLIS).

    Costs more ZeroGPU quota than generate_from_image (two Space calls) and is
    less controllable. Prefer a real product photo when you have one.

    Args:
        prompt: Description, e.g. "a glossy red lipstick tube, studio product photo,
            plain white background".
        name: If given, install the GLB to public/models/<name>/model.glb.
    """
    logs: list[str] = []
    glb = core.text_to_3d(
        prompt, mesh_simplify=mesh_simplify, texture_size=texture_size, log=logs.append
    )
    out = [f"GLB generated: {glb} ({glb.stat().st_size // 1024} KB)"]
    if name:
        dest = core.install_to_landing(glb, name, log=logs.append)
        safe = dest.parent.name
        out.append(f"Installed for the landing: served at /models/{safe}/model.glb")
    return "\n".join(out + logs)


@mcp.tool()
def install_to_landing(glb_path: str, name: str) -> str:
    """Copy an already-generated GLB into public/models/<name>/model.glb."""
    dest = core.install_to_landing(glb_path, name)
    return f"Installed: {dest} (served at /models/{dest.parent.name}/model.glb)"


def main() -> None:
    mcp.run()


if __name__ == "__main__":
    main()
