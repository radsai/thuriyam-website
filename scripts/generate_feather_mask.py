#!/usr/bin/env python3
"""Grayscale PNG alpha for compositing demo onto template: inner opaque “plate” + outer radial feather."""
from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError as e:
    raise SystemExit("pip install pillow") from e


def radial_alpha_at(
    x: float, y: float, w: int, h: int, rad: float, gm: float
) -> float:
    cx, cy = (w - 1) / 2.0, (h - 1) / 2.0
    max_d = math.hypot(cx, cy)
    d = math.hypot(x - cx, y - cy)
    t = min(1.0, d / (rad * max_d))
    return 255.0 * math.pow(1.0 - t, gm)


def rect_sdf(x: float, y: float, cx: float, cy: float, rw: float, rh: float) -> float:
    dx = abs(x - cx) - rw
    dy = abs(y - cy) - rh
    ox = max(dx, 0.0)
    oy = max(dy, 0.0)
    return math.sqrt(ox * ox + oy * oy) + min(max(dx, dy), 0.0)


def plate_alpha_at(
    x: float,
    y: float,
    w: int,
    h: int,
    inner_w_frac: float,
    inner_h_frac: float,
    plate_feather_px: float,
    radial_rad: float,
    radial_gamma: float,
) -> int:
    """Opaque in inner rect (with soft rim); outer region uses max(plate_rim, radial)."""
    cx, cy = w / 2.0, h / 2.0
    rw = w * inner_w_frac / 2.0
    rh = h * inner_h_frac / 2.0
    d_rect = rect_sdf(x, y, cx, cy, rw, rh)
    ra = radial_alpha_at(x, y, w, h, radial_rad, radial_gamma)

    if d_rect <= 0:
        plate = 255.0
    elif d_rect < plate_feather_px:
        plate = 255.0 * (1.0 - d_rect / plate_feather_px)
    else:
        plate = 0.0

    return int(max(0, min(255, round(max(plate, ra)))))


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--width", type=int, required=True)
    p.add_argument("--height", type=int, required=True)
    p.add_argument("--out", type=Path, required=True)
    p.add_argument("--rad", type=float, default=0.46, help="Radial falloff denominator factor")
    p.add_argument("--gamma", type=float, default=0.62)
    p.add_argument(
        "--inner-w-frac",
        type=float,
        default=0.82,
        help="Inner opaque region width as fraction of frame (text + layout safe zone)",
    )
    p.add_argument("--inner-h-frac", type=float, default=0.74)
    p.add_argument(
        "--plate-feather-px",
        type=float,
        default=56,
        help="Soft pixels at inner-plate edge before outer radial takes over",
    )
    args = p.parse_args()

    out = args.out
    w, h = args.width, args.height
    rad = max(0.05, args.rad)
    gm = max(0.05, args.gamma)
    iw = max(0.2, min(1.0, args.inner_w_frac))
    ih = max(0.2, min(1.0, args.inner_h_frac))
    feather = max(4.0, args.plate_feather_px)

    try:
        import numpy as np

        xs = np.arange(w, dtype=np.float64)
        ys = np.arange(h, dtype=np.float64)
        xg, yg = np.meshgrid(xs, ys)
        cx, cy = w / 2.0, h / 2.0
        rw = w * iw / 2.0
        rh = h * ih / 2.0
        dx = np.abs(xg - cx) - rw
        dy = np.abs(yg - cy) - rh
        ox = np.maximum(dx, 0.0)
        oy = np.maximum(dy, 0.0)
        d_rect = np.sqrt(ox * ox + oy * oy) + np.minimum(np.maximum(dx, dy), 0.0)

        max_d = math.hypot(cx, cy)
        d_rad = np.hypot(xg - (w - 1) / 2.0, yg - (h - 1) / 2.0)
        t = np.minimum(1.0, d_rad / (rad * max_d))
        ra = 255.0 * np.power(1.0 - t, gm)

        inside = d_rect <= 0
        rim = (d_rect > 0) & (d_rect < feather)
        plate = np.zeros_like(d_rect)
        plate[inside] = 255.0
        plate[rim] = 255.0 * (1.0 - d_rect[rim] / feather)

        a = np.clip(np.round(np.maximum(plate, ra)), 0, 255).astype(np.uint8)
        out.parent.mkdir(parents=True, exist_ok=True)
        Image.fromarray(a, mode="L").save(out, "PNG")
    except ImportError:
        pix = bytearray(w * h)
        i = 0
        for y in range(h):
            for x in range(w):
                a = plate_alpha_at(
                    float(x),
                    float(y),
                    w,
                    h,
                    iw,
                    ih,
                    feather,
                    rad,
                    gm,
                )
                pix[i] = a
                i += 1
        out.parent.mkdir(parents=True, exist_ok=True)
        Image.frombytes("L", (w, h), bytes(pix)).save(out, "PNG")
    print(f"Wrote {out}", file=sys.stderr)


if __name__ == "__main__":
    main()
