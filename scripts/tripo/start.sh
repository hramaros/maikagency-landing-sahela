#!/usr/bin/env bash
# Start the headless Tripo <-> Blender bridge that the `tripo-mcp` MCP connects to.
#
#   scripts/tripo/start.sh          # start (backgrounded)
#   scripts/tripo/start.sh stop     # stop
#   scripts/tripo/start.sh status   # show state + tail log
#
# Requires: Blender (snap or PATH) and TRIPO_API_KEY in .env.local (gitignored).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DRIVER="$ROOT/scripts/tripo/blender_mcp_server.py"
RUN_DIR="$ROOT/scripts/tripo/.run"
PID_FILE="$RUN_DIR/blender.pid"
LOG_FILE="$RUN_DIR/blender.log"
PORT="${TRIPO_BLENDER_PORT:-9876}"

BLENDER_BIN="${BLENDER_BIN:-$(command -v blender || echo /snap/bin/blender)}"

mkdir -p "$RUN_DIR"

is_running() { [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; }

case "${1:-start}" in
  stop)
    if is_running; then kill "$(cat "$PID_FILE")" && echo "stopped"; else echo "not running"; fi
    rm -f "$PID_FILE"
    ;;
  status)
    if is_running; then echo "running (pid $(cat "$PID_FILE"), port $PORT)"; else echo "not running"; fi
    echo "--- last log lines ---"; tail -n 15 "$LOG_FILE" 2>/dev/null || echo "(no log yet)"
    ;;
  start)
    if is_running; then echo "already running (pid $(cat "$PID_FILE"))"; exit 0; fi
    # Load the API key (and any other local env) without echoing it.
    if [ -f "$ROOT/.env.local" ]; then set -a; . "$ROOT/.env.local"; set +a; fi
    if [ -z "${TRIPO_API_KEY:-}" ]; then
      echo "WARNING: TRIPO_API_KEY not found in .env.local — the bridge will run but generation will fail" >&2
    fi
    if [ ! -x "$BLENDER_BIN" ] && ! command -v "$BLENDER_BIN" >/dev/null 2>&1; then
      echo "ERROR: Blender not found (set BLENDER_BIN)" >&2; exit 1
    fi
    echo "Starting Blender bridge on port $PORT (log: $LOG_FILE)"
    TRIPO_API_KEY="${TRIPO_API_KEY:-}" TRIPO_BLENDER_PORT="$PORT" \
      nohup "$BLENDER_BIN" --background --python "$DRIVER" >"$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "started (pid $(cat "$PID_FILE"))"
    ;;
  *)
    echo "usage: $0 [start|stop|status]" >&2; exit 2
    ;;
esac
