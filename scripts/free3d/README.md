# free3d — generate 3D models for free

Turns a **product photo** (or a text prompt) into a web-ready **GLB** for the
landing's React Three Fiber hero — **without paying and without a local GPU**.

All the heavy compute runs on **Hugging Face's free ZeroGPU Spaces**:
- **image → 3D**: [TRELLIS](https://github.com/microsoft/TRELLIS) (Microsoft, MIT code)
- **text → image** (for text→3D): FLUX.1-schnell (Apache-2.0)

```
photo ──▶ TRELLIS Space (ZeroGPU) ──▶ GLB ──▶ public/models/<name>/model.glb ──▶ Scene3D useGLTF
text  ──▶ FLUX Space ──▶ image ──▶ TRELLIS ──▶ GLB ──▶ …
```

## One-time setup

1. Create a **free** Hugging Face account, then a **read** token:
   <https://huggingface.co/settings/tokens>
2. Add it to the repo's `.env.local` (gitignored):
   ```
   HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Nothing to install globally — `uv` fetches the deps on first run.

## Usage — CLI

```bash
cd scripts/free3d
uv run free3d-cli check                                   # verify token + Spaces are up
uv run free3d-cli image-to-3d ../../path/to/photo.jpg --name lipstick
uv run free3d-cli text-to-3d "a glossy red lipstick tube, studio photo, white bg" --name lipstick
```

`--name lipstick` installs the result to `public/models/lipstick/model.glb`, which
`components/Scene3D.jsx` already loads. Omit `--name` to just get the GLB path.

## Usage — MCP (from Claude)

Declared in the repo `.mcp.json` as **`free3d`**. Restart Claude Code to load it, then
call the tools: `check_setup`, `list_spaces`, `generate_from_image`,
`generate_from_text`, `install_to_landing`.

## Status (2026-07) — read this

The plumbing is complete and validated: HF token auth, Space reachability, and
TRELLIS **image preprocessing** all work. **But** the actual GPU generation call on
the free public Spaces was returning a server-side `TypeError`:

- `trellis-community/TRELLIS` (Gradio 5.34.2) — `/generate_and_extract_glb` raises `TypeError`
- `tencent/Hunyuan3D-2` (Gradio 4.44.0) — `/generation_all` raises `TypeError`

These are **errors inside the Spaces / ZeroGPU**, not in this code (preprocessing on
the same client/Space succeeds). Community ZeroGPU Spaces are UI-first and their API
endpoints break often. If you hit this:

1. **Retry later** — these Spaces get fixed, or traffic/quota clears.
2. **Swap the Space** — edit `DEFAULT_TRELLIS_SPACE` in `core.py` (see `list_spaces`)
   to another fork that's currently healthy.
3. **Duplicate the Space to your own HF account** and run it there for stability
   (ZeroGPU on a duplicate needs an HF PRO account, ~$9/mo — still no per-model cost).

**Version matching matters**: `gradio_client` must be protocol-compatible with the
target Space's Gradio version, or file I/O and payloads mismatch (also surfaces as a
`TypeError`). We pin `gradio-client==1.10.3` for the Gradio-5 TRELLIS Space. If you
switch to a Gradio-4 Space (e.g. Hunyuan 4.44), pin `gradio-client==1.3.0` instead.

## Notes & limits (honest)

- **Free = rate-limited.** ZeroGPU gives ~300 GPU-seconds per token window (refilling);
  each model is ~2–5 min plus queue. Great for authoring assets, not a live end-user API.
- **Spaces drift.** Community Spaces can go down or change their Gradio signature. The
  Space names are constants in `free3d/core.py` with fallbacks (`list_spaces`); swap if one breaks.
- **Image → 3D beats text → 3D** — better quality, half the quota (one Space call). Prefer a
  real product photo on a plain background.
- **Output is web-optimised on TRELLIS's side** via `mesh_simplify` / `texture_size`. For an
  extra pass, run `npx @gltf-transform/cli optimize in.glb out.glb --texture-size 1024 --compress false`.
- **Licensing** (this is a client storefront): TRELLIS code is MIT; verify the weights' terms for
  commercial use before shipping generated assets. FLUX.1-schnell is Apache-2.0.

## Files

- `free3d/core.py` — generation logic (Space endpoints, GLB extraction, install). Reusable.
- `free3d/server.py` — MCP (FastMCP) wrapper.
- `free3d/cli.py` — command-line wrapper.
- `.run/` — scratch for intermediate PNG/GLB (gitignored).
