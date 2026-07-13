# Tripo 3D → Blender bridge (headless)

Lets the `tripo-mcp` MCP server (declared in `.mcp.json`) generate 3D models and
drive Blender **without opening the Blender GUI** — for headless servers.

## How it fits together

```
Claude / MCP client
      │  (stdio)
   tripo-mcp  ──TCP──▶  localhost:9876  ◀── Blender (headless) + "Tripo 3D" addon
                                              │
                                              └─▶ Tripo Cloud API (needs credits)
```

- `tripo-mcp` is a **client**: it connects to a Blender socket server on port 9876
  and reads the Tripo API key **from the Blender scene** (not from an env var of
  its own). So Blender must be running with the addon and the key loaded.
- This folder runs that Blender server headlessly.

## Prerequisites

1. **Blender** on PATH or at `/snap/bin/blender` (override with `BLENDER_BIN`).
2. The **Tripo 3D addon** installed & enabled in Blender as module
   `tripo_3d_for_blender` (in `~/.config/blender/<ver>/scripts/addons/`).
3. **`TRIPO_API_KEY=tsk_...`** in the repo's `.env.local` (gitignored). Get/top-up
   credits at <https://platform.tripo3d.ai>. A `tsk_` key with **0 credits**
   authenticates but every generation fails with `[2010] not enough credit`.

## Usage

```bash
scripts/tripo/start.sh          # launch the bridge (backgrounded)
scripts/tripo/start.sh status   # running? + last log lines
scripts/tripo/start.sh stop     # stop it
```

Then start (or restart) your Claude Code session so it picks up `tripo-mcp`, and
the MCP tools (`get_scene_info`, `create_3d_model_from_text`, …) will reach Blender.

## Notes

- Object-creation tools (`create_object`, …) need a `VIEW_3D` area, which does not
  exist in `--background` mode. Scene queries, `execute_code`, and
  `import_tripo_glb_model` work headless; full generation into a visible viewport
  needs a real Blender session.
- The key is injected into the Blender scene from the environment at startup and is
  never written to a committed file.
