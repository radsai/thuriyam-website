#!/usr/bin/env python3
"""Concatenate short MP4 parts with crossfades (ffmpeg xfade)."""
from __future__ import annotations

import argparse
import json
import subprocess
import tempfile
from pathlib import Path


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", type=Path, required=True, help="JSON with slides[].durationSec")
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--fade", type=float, default=0.28)
    ap.add_argument("parts", nargs="+", type=Path, help="part01.mp4 part02.mp4 ... in order")
    args = ap.parse_args()

    data = json.loads(args.manifest.read_text(encoding="utf-8"))
    durs = [float(s["durationSec"]) for s in data["slides"]]
    if len(durs) != len(args.parts):
        raise SystemExit(f"Manifest has {len(durs)} slides but {len(args.parts)} parts passed")

    fade = min(args.fade, min(durs) * 0.35)
    if fade <= 0.05:
        fade = 0.0

    if fade == 0.0:
        lst = tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False)
        for p in args.parts:
            lst.write(f"file '{p.resolve()}'\n")
        lst.close()
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                lst.name,
                "-c",
                "copy",
                str(args.out),
            ],
            check=True,
        )
        Path(lst.name).unlink(missing_ok=True)
        print(f"Wrote {args.out} (concat copy)")
        return

    # [0][1]xfade=...:offset=d0-fade[v1]; [v1][2]xfade=...:offset=...
    inputs: list[str] = []
    for p in args.parts:
        inputs.extend(["-i", str(p.resolve())])

    acc = durs[0]
    graph_parts: list[str] = []
    prev = "[0:v]"
    for i in range(1, len(args.parts)):
        offset = acc - fade
        out = f"[v{i}]" if i < len(args.parts) - 1 else "[vout]"
        graph_parts.append(
            f"{prev}[{i}:v]xfade=transition=fade:duration={fade}:offset={offset:.4f}{out}"
        )
        acc += durs[i] - fade
        prev = out

    fc = ";".join(graph_parts)
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", *inputs, "-filter_complex", fc, "-map", "[vout]", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(args.out)]
    subprocess.run(cmd, check=True)
    print(f"Wrote {args.out} (xfade {fade}s)")


if __name__ == "__main__":
    main()
