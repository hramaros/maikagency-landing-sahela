"""Command-line entry point for the free 3D pipeline.

Examples:
    free3d-cli image-to-3d product.jpg --name lipstick
    free3d-cli text-to-3d "a glossy red lipstick tube, studio photo" --name lipstick
    free3d-cli check                       # verify HF token + Space reachability
"""

from __future__ import annotations

import argparse
import sys

from . import core


def _cmd_check(_args) -> int:
    try:
        core._require_token()
        print("HF_TOKEN: found")
    except RuntimeError as e:
        print(f"HF_TOKEN: MISSING — {e}")
        return 1

    for space in [core.DEFAULT_TRELLIS_SPACE, core.DEFAULT_FLUX_SPACE]:
        try:
            core._client(space)
            print(f"Space reachable: {space}")
        except Exception as e:
            print(f"Space UNREACHABLE: {space} — {type(e).__name__}: {e}")
    return 0


def _cmd_image_to_3d(args) -> int:
    glb = core.image_to_3d(args.image, mesh_simplify=args.mesh_simplify, texture_size=args.texture_size)
    if args.name:
        core.install_to_landing(glb, args.name)
    else:
        print(f"GLB: {glb}")
    return 0


def _cmd_text_to_3d(args) -> int:
    glb = core.text_to_3d(args.prompt, mesh_simplify=args.mesh_simplify, texture_size=args.texture_size)
    if args.name:
        core.install_to_landing(glb, args.name)
    else:
        print(f"GLB: {glb}")
    return 0


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="free3d-cli", description="Free image/text -> 3D (GLB).")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("check", help="Verify HF token and Space reachability").set_defaults(func=_cmd_check)

    pi = sub.add_parser("image-to-3d", help="Product image -> GLB")
    pi.add_argument("image")
    pi.add_argument("--name", help="Install into public/models/<name>/model.glb")
    pi.add_argument("--mesh-simplify", type=float, default=0.95, dest="mesh_simplify")
    pi.add_argument("--texture-size", type=int, default=1024, dest="texture_size")
    pi.set_defaults(func=_cmd_image_to_3d)

    pt = sub.add_parser("text-to-3d", help="Text prompt -> GLB (text->image->3D)")
    pt.add_argument("prompt")
    pt.add_argument("--name", help="Install into public/models/<name>/model.glb")
    pt.add_argument("--mesh-simplify", type=float, default=0.95, dest="mesh_simplify")
    pt.add_argument("--texture-size", type=int, default=1024, dest="texture_size")
    pt.set_defaults(func=_cmd_text_to_3d)

    args = p.parse_args(argv)
    try:
        return args.func(args)
    except Exception as e:  # noqa: BLE001
        print(f"error: {type(e).__name__}: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
