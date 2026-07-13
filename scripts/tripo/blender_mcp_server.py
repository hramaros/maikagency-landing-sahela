# Headless driver for the Tripo 3D Blender addon's socket server.
#
# Runs INSIDE Blender:  blender --background --python blender_mcp_server.py
# It enables the addon, injects the Tripo API key from the TRIPO_API_KEY env var
# into the Blender scene (the addon/MCP read the key from there), starts the
# BlenderMCPServer socket on localhost:9876, and drives its poll loop forever.
#
# In --background mode bpy.app.timers do not tick, so we call the server's
# _process_server() ourselves. The tripo-mcp MCP connects to 9876 as a client.

import os
import time

import bpy
import addon_utils

ADDON = "tripo_3d_for_blender"
HOST = os.environ.get("TRIPO_BLENDER_HOST", "localhost")
PORT = int(os.environ.get("TRIPO_BLENDER_PORT", "9876"))


def main():
    addon_utils.enable(ADDON, default_set=True, persistent=True)

    scene = bpy.context.scene
    key = os.environ.get("TRIPO_API_KEY", "").strip()
    if key:
        scene.api_key = key
        scene.api_key_confirmed = True
        masked = key[:8] + "…" + key[-4:] if len(key) > 12 else "set"
        print(f"[tripo] API key loaded from env ({masked})", flush=True)
    else:
        print("[tripo] WARNING: TRIPO_API_KEY not set — generation calls will fail", flush=True)

    try:
        scene.blendermcp_use_polyhaven = False
    except Exception:
        pass

    from tripo_3d_for_blender.server import BlenderMCPServer

    srv = BlenderMCPServer(host=HOST, port=PORT)
    srv.start()
    print(f"[tripo] BlenderMCP socket server listening on {HOST}:{PORT} — Ctrl+C to stop", flush=True)

    try:
        while True:
            srv._process_server()
            time.sleep(0.05)
    except KeyboardInterrupt:
        pass
    finally:
        srv.stop()
        print("[tripo] server stopped", flush=True)


if __name__ == "__main__":
    main()
