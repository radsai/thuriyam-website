#!/usr/bin/env python3
"""
Animated slides for Agent Builder demo video: gradients, icons, text motion.
Requires Pillow: pip install pillow

Static PNG mode (legacy):
  python3 render_agent_builder_demo_slides.py --slides-dir DIR --out-dir DIR

Animated frames (one subdir per slide with %05d.png):
  python3 render_agent_builder_demo_slides.py animate --manifest M --slides-dir DIR --frames-root DIR

Optional per-slide PNG icons: set "iconPng" (path under assetsBase) in the manifest; see
scripts/agent-builder-demo-assets/README.md
"""
from __future__ import annotations

import argparse
import json
import math
import sys
import textwrap
from pathlib import Path
from typing import Callable

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as e:  # pragma: no cover
    raise SystemExit("Pillow is required. Install with: pip install pillow") from e

W, H = 1920, 1080
PAD_X = 140
ICON_Y = 175
ICON_R = 118
ICON_MAX_DEFAULT_PX = int(ICON_R * 2)  # max width or height before animated scale
MAX_TITLE_CHARS = 44
MAX_BODY_CHARS = 52


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip().lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def smoothstep(edge0: float, edge1: float, x: float) -> float:
    if edge1 <= edge0:
        return 1.0 if x >= edge0 else 0.0
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)


def lerp_rgb(
    a: tuple[int, int, int], b: tuple[int, int, int], t: float
) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    return (
        int(lerp(a[0], b[0], t)),
        int(lerp(a[1], b[1], t)),
        int(lerp(a[2], b[2], t)),
    )


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        p = Path(path)
        if p.is_file():
            return ImageFont.truetype(str(p), size=size)
    return ImageFont.load_default()


def draw_gradient_vertical(
    draw: ImageDraw.ImageDraw, top: tuple[int, int, int], bot: tuple[int, int, int]
) -> None:
    for y in range(H):
        t = y / max(H - 1, 1)
        c = lerp_rgb(top, bot, t)
        draw.line([(0, y), (W, y)], fill=c)


def draw_soft_vignette(base: Image.Image) -> None:
    """Subtle radial darkening at edges (in-place RGB)."""
    overlay = Image.new("L", (W, H), 0)
    od = ImageDraw.Draw(overlay)
    cx, cy = W // 2, H // 2
    max_r = int(math.hypot(cx, cy) * 1.05)
    # Coarser steps than per-pixel rings — same look, ~10× faster per frame.
    for r in range(max_r, 0, -36):
        alpha = int(28 * (1.0 - r / max_r) ** 1.8)
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=min(85, alpha))
    vig = Image.new("RGB", (W, H), (0, 0, 0))
    base.paste(vig, mask=overlay)


def resolve_icon_png_path(manifest_path: Path, manifest: dict, spec: dict) -> Path | None:
    """Return absolute path to icon PNG, or None if unset / missing / unsafe."""
    rel = spec.get("iconPng")
    if not rel or not str(rel).strip():
        return None
    base_name = str(manifest.get("assetsBase", "agent-builder-demo-assets")).strip() or "agent-builder-demo-assets"
    base = (manifest_path.parent / base_name).resolve()
    full = (base / str(rel).strip()).resolve()
    try:
        full.relative_to(base)
    except ValueError:
        print(f"ERROR: iconPng must stay under {base}", file=sys.stderr)
        return None
    if not full.is_file():
        print(f"WARN: icon PNG not found, using vector icon: {full}", file=sys.stderr)
        return None
    return full


def load_png_icon(
    path: Path, accent: tuple[int, int, int], tint_accent: bool
) -> Image.Image:
    """Load RGBA; optional recolor for white-on-transparent glyphs."""
    im = Image.open(path).convert("RGBA")
    if tint_accent:
        _, _, _, a = im.split()
        r = Image.new("L", im.size, accent[0])
        g = Image.new("L", im.size, accent[1])
        b = Image.new("L", im.size, accent[2])
        im = Image.merge("RGBA", (r, g, b, a))
    return im


def composite_scaled_icon(
    layer: Image.Image,
    icon: Image.Image,
    cx: int,
    cy: int,
    max_px: int,
    scale: float,
    global_alpha: int,
) -> None:
    """Paste icon centered at (cx, cy); scale so max dimension <= max_px * scale."""
    ga = max(0, min(255, global_alpha))
    if ga == 0:
        return
    target = max(16, int(max(1, max_px) * max(0.05, scale)))
    w, h = icon.size
    if w < 1 or h < 1:
        return
    if w >= h:
        nw = target
        nh = max(1, int(round(h * target / w)))
    else:
        nh = target
        nw = max(1, int(round(w * target / h)))
    resized = icon.resize((nw, nh), Image.Resampling.LANCZOS)
    if ga < 255:
        r, g, b, a = resized.split()
        a = a.point(lambda p, ga=ga: min(255, int(p * ga / 255)))
        resized = Image.merge("RGBA", (r, g, b, a))
    x = int(cx - nw // 2)
    y = int(cy - nh // 2)
    layer.alpha_composite(resized, (x, y))


def draw_decor_dots(draw_rgba: ImageDraw.ImageDraw, alpha: int) -> None:
    step = 96
    a = max(8, min(alpha, 40))
    for y in range(step // 2, H, step):
        for x in range(step // 2, W, step):
            draw_rgba.ellipse([x - 2, y - 2, x + 2, y + 2], fill=(255, 255, 255, a))


# --- Icons (simple vector-style, accent-colored) ---


def _disk(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, fill, width: int = 0):
    bb = [cx - r, cy - r, cx + r, cy + r]
    if width:
        draw.ellipse(bb, outline=fill, width=width)
    else:
        draw.ellipse(bb, fill=fill)


IconFn = Callable[
    [ImageDraw.ImageDraw, float, float, float, tuple[int, int, int, int]], None
]


def icon_sparkles(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    for ang, dist in [(0, 0), (40, 0.35), (120, 0.28), (220, 0.32)]:
        rad = math.radians(ang)
        x = cx + math.cos(rad) * s * dist
        y = cy + math.sin(rad) * s * dist
        _disk(d, x, y, s * 0.12, f)
    d.line([cx, cy - s * 0.55, cx, cy + s * 0.55], fill=f, width=max(3, int(s * 0.08)))
    d.line([cx - s * 0.55, cy, cx + s * 0.55, cy], fill=f, width=max(3, int(s * 0.08)))


def icon_globe(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    _disk(d, cx, cy, s * 0.92, f, width=max(3, int(s * 0.07)))
    d.line([cx, cy - s * 0.92, cx, cy + s * 0.92], fill=f, width=max(2, int(s * 0.05)))
    d.arc(
        [cx - s * 0.9, cy - s * 0.45, cx + s * 0.9, cy + s * 0.45],
        200,
        340,
        fill=f,
        width=max(3, int(s * 0.06)),
    )
    d.arc(
        [cx - s * 0.9, cy - s * 0.1, cx + s * 0.9, cy + s * 0.65],
        20,
        160,
        fill=f,
        width=max(3, int(s * 0.06)),
    )


def icon_memory(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    w, h = s * 1.1, s * 0.42
    for i, o in enumerate([-0.55, 0, 0.55]):
        ox, oy = cx - w / 2, cy - h / 2 + o * s * 0.38
        d.rounded_rectangle([ox, oy, ox + w, oy + h], radius=12, outline=f, width=4)
        _disk(d, ox + w * 0.15, oy + h / 2, s * 0.07, f)


def icon_shield(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    pts = [
        (cx, cy - s * 0.95),
        (cx + s * 0.72, cy - s * 0.35),
        (cx + s * 0.62, cy + s * 0.55),
        (cx, cy + s * 0.92),
        (cx - s * 0.62, cy + s * 0.55),
        (cx - s * 0.72, cy - s * 0.35),
    ]
    d.polygon(pts, outline=f, width=max(3, int(s * 0.07)))
    d.line(
        [cx - s * 0.22, cy + s * 0.08, cx - s * 0.02, cy + s * 0.32, cx + s * 0.35, cy - s * 0.18],
        fill=f,
        width=max(4, int(s * 0.09)),
    )


def icon_cpu(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    sq = s * 0.65
    d.rounded_rectangle(
        [cx - sq, cy - sq, cx + sq, cy + sq], radius=10, outline=f, width=4
    )
    d.rectangle([cx - sq * 0.45, cy - sq * 0.45, cx + sq * 0.45, cy + sq * 0.45], outline=f, width=3)
    pin = max(2, int(s * 0.06))
    for i in range(-2, 3):
        o = i * s * 0.22
        d.line([cx + o, cy - sq - s * 0.2, cx + o, cy - sq], fill=f, width=pin)
        d.line([cx + o, cy + sq, cx + o, cy + sq + s * 0.2], fill=f, width=pin)
        d.line([cx - sq - s * 0.2, cy + o, cx - sq, cy + o], fill=f, width=pin)
        d.line([cx + sq, cy + o, cx + sq + s * 0.2, cy + o], fill=f, width=pin)


def icon_chart(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    bw = s * 0.22
    base_y = cy + s * 0.55
    for i, hmul in enumerate([0.35, 0.62, 0.48, 0.78]):
        x0 = cx - s * 0.75 + i * (bw + s * 0.12)
        h = s * hmul
        d.rectangle([x0, base_y - h, x0 + bw, base_y], outline=f, width=3)


def icon_bot(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    d.rounded_rectangle(
        [cx - s * 0.65, cy - s * 0.45, cx + s * 0.65, cy + s * 0.55],
        radius=16,
        outline=f,
        width=4,
    )
    _disk(d, cx - s * 0.28, cy - s * 0.08, s * 0.1, f)
    _disk(d, cx + s * 0.28, cy - s * 0.08, s * 0.1, f)
    d.arc(
        [cx - s * 0.25, cy + s * 0.02, cx + s * 0.25, cy + s * 0.38],
        200,
        340,
        fill=f,
        width=3,
    )
    d.line([cx, cy + s * 0.55, cx, cy + s * 0.95], fill=f, width=4)
    d.line([cx - s * 0.35, cy + s * 0.78, cx + s * 0.35, cy + s * 0.78], fill=f, width=4)


def icon_rocket(d: ImageDraw.ImageDraw, cx: float, cy: float, s: float, col: tuple[int, int, int, int]):
    r, g, b, a = col
    f = (r, g, b, a)
    body = [
        (cx, cy - s * 0.95),
        (cx + s * 0.38, cy + s * 0.35),
        (cx + s * 0.22, cy + s * 0.72),
        (cx - s * 0.22, cy + s * 0.72),
        (cx - s * 0.38, cy + s * 0.35),
    ]
    d.polygon(body, outline=f, width=4)
    d.polygon(
        [
            (cx - s * 0.38, cy + s * 0.35),
            (cx - s * 0.82, cy + s * 0.82),
            (cx - s * 0.22, cy + s * 0.72),
        ],
        outline=f,
        width=3,
    )
    d.polygon(
        [
            (cx + s * 0.38, cy + s * 0.35),
            (cx + s * 0.82, cy + s * 0.82),
            (cx + s * 0.22, cy + s * 0.72),
        ],
        outline=f,
        width=3,
    )
    _disk(d, cx, cy - s * 0.15, s * 0.14, (255, 255, 255, min(255, a)))


ICONS: dict[str, IconFn] = {
    "sparkles": icon_sparkles,
    "globe": icon_globe,
    "memory": icon_memory,
    "shield": icon_shield,
    "cpu": icon_cpu,
    "chart": icon_chart,
    "bot": icon_bot,
    "rocket": icon_rocket,
}


def parse_title_body(text: str) -> tuple[str, list[str]]:
    lines = [ln.strip() for ln in text.strip().split("\n")]
    non_empty = [ln for ln in lines if ln]
    if not non_empty:
        return "", []
    title = non_empty[0]
    body_lines: list[str] = []
    for ln in non_empty[1:]:
        body_lines.extend(textwrap.wrap(ln, width=MAX_BODY_CHARS) or [""])
    return title, body_lines


def draw_text_block(
    base: Image.Image,
    lines: list[tuple[str, ImageFont.ImageFont, float, float]],
    start_y: int,
) -> None:
    """lines: (text, font, alpha 0-1, y_offset)"""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    y = start_y
    for txt, font, alpha, y_off in lines:
        if not txt:
            y += 14
            continue
        a = int(max(0, min(1, alpha)) * 255)
        yy = int(y + y_off)
        bbox = d.textbbox((0, 0), txt, font=font)
        tw = bbox[2] - bbox[0]
        x = (W - tw) // 2
        d.text((x, yy), txt, font=font, fill=(255, 255, 255, a))
        th = bbox[3] - bbox[1]
        y = yy + th + 14
    base_rgba = base.convert("RGBA")
    out = Image.alpha_composite(base_rgba, layer)
    base.paste(out.convert("RGB"))


def _rgb_mix(c: tuple[int, int, int], vis: float, dark: tuple[int, int, int] = (18, 22, 38)) -> tuple[int, int, int]:
    return (
        int(lerp(dark[0], c[0], vis)),
        int(lerp(dark[1], c[1], vis)),
        int(lerp(dark[2], c[2], vis)),
    )


def draw_slide_layout_elements(
    base: Image.Image,
    slide_id: int,
    accent: tuple[int, int, int],
    u: float,
    y_top: int,
) -> int:
    """
    Remotion-style layered visuals (chips, cards, small diagrams) below the hero icon.
    Returns Y coordinate to start title text (with margin).
    """
    vis = smoothstep(0.18, 0.48, u)
    pulse = 0.97 + 0.03 * math.sin(u * math.pi * 2)
    va = max(0.0, min(1.0, vis * pulse))
    if va < 0.05:
        return y_top + 24

    d = ImageDraw.Draw(base)
    y = y_top
    ac = accent
    sec = _rgb_mix((220, 224, 245), va)
    text_start = y_top + 32

    if slide_id == 1:
        labels = ["Config", "Ready", "Tour"]
        font = load_font(22)
        gap = 12
        total = 0
        boxes: list[tuple[str, int]] = []
        for lab in labels:
            bb = d.textbbox((0, 0), lab, font=font)
            bw = bb[2] - bb[0] + 36
            boxes.append((lab, bw))
            total += bw + gap
        total -= gap
        x = (W - total) // 2
        bh = 0
        for lab, bw in boxes:
            bh = max(bh, d.textbbox((0, 0), lab, font=font)[3] - d.textbbox((0, 0), lab, font=font)[1] + 22)
            d.rounded_rectangle(
                [x, y, x + bw, y + bh],
                radius=14,
                outline=ac,
                width=2,
                fill=_rgb_mix((28, 34, 52), va),
            )
            d.text((x + 18, y + 11), lab, font=font, fill=_rgb_mix((255, 255, 255), va))
            x += bw + gap
        text_start = y + bh + 32

    elif slide_id == 2:
        labels = ["Web", "API", "Slack", "WA", "Mail"]
        box_w, box_h = 128, 54
        gap = 14
        total = len(labels) * box_w + (len(labels) - 1) * gap
        x0 = (W - total) // 2
        font = load_font(20)
        for i, lab in enumerate(labels):
            x = x0 + i * (box_w + gap)
            d.rounded_rectangle(
                [x, y, x + box_w, y + box_h],
                radius=12,
                outline=ac,
                width=2,
                fill=_rgb_mix((20, 36, 58), va),
            )
            tb = d.textbbox((0, 0), lab, font=font)
            d.text(
                (x + (box_w - (tb[2] - tb[0])) // 2, y + 14),
                lab,
                font=font,
                fill=_rgb_mix((255, 255, 255), va),
            )
        text_start = y + box_h + 36

    elif slide_id == 3:
        w2, h2, gap = 320, 118, 28
        cx = W // 2
        x_l = cx - w2 - gap // 2
        x_r = cx + gap // 2
        font_t, font_s = load_font(24), load_font(18)
        for x, title, sub in [
            (x_l, "Short-term", "Recent chats"),
            (x_r, "Long-term", "Facts & prefs"),
        ]:
            d.rounded_rectangle(
                [x, y, x + w2, y + h2],
                radius=16,
                outline=ac,
                width=2,
                fill=_rgb_mix((32, 24, 52), va),
            )
            d.text((x + 22, y + 16), title, font=font_t, fill=_rgb_mix((255, 255, 255), va))
            d.text((x + 22, y + 52), sub, font=font_s, fill=sec)
            ly = y + 78
            for _ in range(3):
                d.rounded_rectangle(
                    [x + 22, ly, x + w2 - 40, ly + 8],
                    radius=4,
                    fill=_rgb_mix((70, 62, 110), max(0.0, min(1.0, va * 0.55))),
                )
                ly += 12
        text_start = y + h2 + 36

    elif slide_id == 4:
        cx = W // 2
        cy = y + 50
        s = 44
        pts = [
            (cx, cy - s),
            (cx + s * 0.72, cy - s * 0.2),
            (cx + s * 0.55, cy + s * 0.65),
            (cx, cy + s * 0.92),
            (cx - s * 0.55, cy + s * 0.65),
            (cx - s * 0.72, cy - s * 0.2),
        ]
        d.polygon(pts, outline=ac, width=3)
        d.line(
            [cx - s * 0.22, cy + s * 0.05, cx - s * 0.05, cy + s * 0.28, cx + s * 0.32, cy - s * 0.18],
            fill=ac,
            width=4,
        )
        pill = "Verified on every reply"
        font = load_font(22)
        pb = d.textbbox((0, 0), pill, font=font)
        pw, ph = pb[2] - pb[0] + 48, pb[3] - pb[1] + 18
        px = (W - pw) // 2
        py = y + 100
        d.rounded_rectangle(
            [px, py, px + pw, py + ph],
            radius=20,
            fill=_rgb_mix((24, 56, 40), va),
            outline=ac,
            width=2,
        )
        d.text((px + 24, py + 9), pill, font=font, fill=_rgb_mix((255, 255, 255), va))
        pct = f"{int(lerp(92, 99, vis))}%"
        font2 = load_font(34)
        tb = d.textbbox((0, 0), pct, font=font2)
        d.text((cx - (tb[2] - tb[0]) // 2, py + ph + 12), pct, font=font2, fill=ac)
        text_start = py + ph + 58

    elif slide_id == 5:
        chips = [("Frontier", "Most capable"), ("Fast", "Low latency"), ("Lean", "Cost-aware")]
        box_w, box_h = 200, 72
        gap = 20
        total = 3 * box_w + 2 * gap
        x0 = (W - total) // 2
        f1, f2 = load_font(22), load_font(16)
        for i, (t1, t2) in enumerate(chips):
            x = x0 + i * (box_w + gap)
            d.rounded_rectangle(
                [x, y, x + box_w, y + box_h],
                radius=14,
                outline=ac,
                width=2,
                fill=_rgb_mix((26, 34, 54), va),
            )
            d.text((x + 14, y + 12), t1, font=f1, fill=_rgb_mix((255, 255, 255), va))
            d.text((x + 14, y + 42), t2, font=f2, fill=sec)
        text_start = y + box_h + 36

    elif slide_id == 6:
        ms = int(lerp(140, 245, vis))
        cards = [("Latency", f"{ms} ms"), ("Success", "98%"), ("Cost", "~$0.02")]
        cw, ch = 200, 88
        gap = 24
        total = 3 * cw + 2 * gap
        x0 = (W - total) // 2
        f1, f2 = load_font(20), load_font(30)
        for i, (lab, val) in enumerate(cards):
            x = x0 + i * (cw + gap)
            d.rounded_rectangle(
                [x, y, x + cw, y + ch],
                radius=14,
                outline=ac,
                width=2,
                fill=_rgb_mix((30, 30, 64), va),
            )
            d.text((x + 16, y + 12), lab, font=f1, fill=sec)
            d.text((x + 16, y + 40), val, font=f2, fill=_rgb_mix((255, 255, 255), va))
        text_start = y + ch + 36

    elif slide_id == 7:
        cx = W // 2
        d.rounded_rectangle(
            [cx - 120, y, cx + 120, y + 56],
            radius=14,
            outline=ac,
            width=2,
            fill=_rgb_mix((48, 32, 22), va),
        )
        font = load_font(24)
        d.text((cx - 48, y + 14), "Connect", font=font, fill=_rgb_mix((255, 255, 255), va))
        y2 = y + 80
        for i, lab in enumerate(["Provider A", "Provider B", "Yours"]):
            ox = cx - 200 + i * 200
            d.line([cx, y + 56, ox, y2], fill=_rgb_mix(ac, va * 0.75), width=2)
            d.ellipse([ox - 10, y2 - 10, ox + 10, y2 + 10], outline=ac, width=2)
            fn = load_font(16)
            tb = d.textbbox((0, 0), lab, font=fn)
            d.text((ox - (tb[2] - tb[0]) // 2, y2 + 14), lab, font=fn, fill=sec)
        text_start = y2 + 48

    else:
        feats = ["Channels", "Memory", "QA", "Models", "Analytics", "BYO"]
        gap = 10
        font = load_font(17)
        total_w = 0
        parts: list[tuple[str, int]] = []
        for f in feats:
            bb = d.textbbox((0, 0), f, font=font)
            bw = bb[2] - bb[0] + 20
            parts.append((f, bw))
            total_w += bw + gap
        total_w -= gap
        x_cur = (W - total_w) // 2
        for f, bw in parts:
            d.rounded_rectangle(
                [x_cur, y, x_cur + bw, y + 36],
                radius=10,
                fill=_rgb_mix((52, 26, 32), va),
                outline=ac,
                width=1,
            )
            d.text((x_cur + 10, y + 8), f, font=font, fill=_rgb_mix((255, 255, 255), va))
            x_cur += bw + gap
        font_d = load_font(32)
        dep = "Deploy"
        db = d.textbbox((0, 0), dep, font=font_d)
        dw, dh = db[2] - db[0] + 56, db[3] - db[1] + 24
        dx = (W - dw) // 2
        dy = y + 48
        d.rounded_rectangle(
            [dx, dy, dx + dw, dy + dh],
            radius=22,
            fill=(
                int(lerp(40, ac[0], va * 0.45)),
                int(lerp(30, ac[1], va * 0.45)),
                int(lerp(45, ac[2], va * 0.45)),
            ),
            outline=_rgb_mix((255, 255, 255), va),
            width=2,
        )
        d.text((dx + 28, dy + 12), dep, font=font_d, fill=_rgb_mix((255, 255, 255), va))
        text_start = dy + dh + 28

    return min(text_start, H - 200)


def draw_progress(base: Image.Image, index: int, total: int, alpha: float) -> None:
    a = int(max(0, min(1, alpha)) * 255)
    if a < 8:
        return
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    label = f"{index} / {total}"
    font = load_font(26)
    bbox = d.textbbox((0, 0), label, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 22, 12
    x0 = (W - tw - pad_x * 2) // 2
    y0 = H - 72
    d.rounded_rectangle(
        [x0, y0, x0 + tw + pad_x * 2, y0 + th + pad_y * 2],
        radius=20,
        fill=(0, 0, 0, min(120, a // 2)),
        outline=(255, 255, 255, min(180, a)),
        width=2,
    )
    d.text((x0 + pad_x, y0 + pad_y), label, font=font, fill=(255, 255, 255, a))
    base_rgba = base.convert("RGBA")
    out = Image.alpha_composite(base_rgba, layer)
    base.paste(out.convert("RGB"))


def render_frame(
    *,
    title: str,
    body_lines: list[str],
    slide_index: int,
    slide_total: int,
    slide_id: int,
    u: float,
    gradient_top: tuple[int, int, int],
    gradient_bot: tuple[int, int, int],
    accent: tuple[int, int, int],
    icon_name: str,
    icon_raster: Image.Image | None = None,
    icon_max_px: int = ICON_MAX_DEFAULT_PX,
) -> Image.Image:
    # subtle background breathing
    shift = 0.045 * math.sin(u * math.pi * 2)
    gtop = lerp_rgb(gradient_top, (255, 255, 255), shift * 0.35)
    gbot = lerp_rgb(gradient_bot, (255, 255, 255), shift * 0.2)

    base = Image.new("RGB", (W, H), gtop)
    draw = ImageDraw.Draw(base)
    draw_gradient_vertical(draw, gtop, gbot)
    draw_soft_vignette(base)

    deco = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(deco)
    draw_decor_dots(dd, 28)
    base = Image.alpha_composite(base.convert("RGBA"), deco).convert("RGB")

    icon_u = smoothstep(0.0, 0.18, u)
    icon_pulse = 0.92 + 0.08 * smoothstep(0.18, 0.45, u)
    icon_scale = lerp(0.82, 1.0, icon_u) * icon_pulse
    icon_alpha = int(255 * min(1.0, icon_u * 1.15))

    ilayer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if icon_raster is not None:
        composite_scaled_icon(
            ilayer,
            icon_raster,
            W // 2,
            ICON_Y,
            icon_max_px,
            icon_scale,
            icon_alpha,
        )
    else:
        icon_fn = ICONS.get(icon_name, icon_sparkles)
        ia = (
            min(255, accent[0] + 25),
            min(255, accent[1] + 25),
            min(255, accent[2] + 25),
            icon_alpha,
        )
        idraw = ImageDraw.Draw(ilayer)
        icon_fn(idraw, W // 2, ICON_Y, ICON_R * icon_scale, ia)
    base = Image.alpha_composite(base.convert("RGBA"), ilayer).convert("RGB")

    layout_y = int(ICON_Y + ICON_R * icon_scale + 16)
    text_start_y = draw_slide_layout_elements(
        base, slide_id, accent, u, y_top=layout_y
    )

    title_font = load_font(46)
    body_font = load_font(32)

    title_alpha = smoothstep(0.0, 0.24, u)
    title_yoff = (1.0 - smoothstep(0.0, 0.24, u)) * 36
    body_alpha = smoothstep(0.1, 0.4, u)
    body_yoff = (1.0 - smoothstep(0.1, 0.4, u)) * 28

    title_wrapped = textwrap.wrap(title, width=MAX_TITLE_CHARS) or [title]

    text_vis = max(title_alpha, body_alpha)
    if text_vis > 0.04:
        plate_alpha = int(min(220, 40 + text_vis * 200))
        px0, px1 = 120, W - 120
        py1 = max(0, text_start_y - 12)
        est_h = len(title_wrapped) * 58 + max(0, len(body_lines)) * 44 + 24
        py2 = min(H - 40, py1 + est_h)
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.rounded_rectangle(
            [px0, py1, px1, py2],
            radius=28,
            fill=(12, 16, 28, plate_alpha),
            outline=(255, 255, 255, int(plate_alpha * 0.25)),
            width=1,
        )
        base = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")

    animated: list[tuple[str, ImageFont.ImageFont, float, float]] = []
    for tline in title_wrapped:
        animated.append((tline, title_font, title_alpha, title_yoff))
    for bline in body_lines:
        animated.append((bline, body_font, body_alpha, body_yoff))

    draw_text_block(base, animated, text_start_y)
    prog_alpha = smoothstep(0.05, 0.2, u)
    draw_progress(base, slide_index, slide_total, prog_alpha)
    return base


def render_static_slide(text: str, out_path: Path, slide_id: int = 1) -> None:
    """Single PNG, no animation (legacy)."""
    title, body = parse_title_body(text)
    img = render_frame(
        title=title or " ",
        body_lines=body,
        slide_index=slide_id,
        slide_total=8,
        slide_id=slide_id,
        u=1.0,
        gradient_top=hex_to_rgb("#16213e"),
        gradient_bot=hex_to_rgb("#0f0f23"),
        accent=hex_to_rgb("#e94560"),
        icon_name="sparkles",
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG")


def render_animated_slide(
    *,
    text: str,
    slide_index: int,
    slide_total: int,
    duration_sec: float,
    fps: int,
    gradient_top: str,
    gradient_bottom: str,
    accent_hex: str,
    icon: str,
    out_dir: Path,
    icon_raster: Image.Image | None = None,
    icon_max_px: int = ICON_MAX_DEFAULT_PX,
) -> None:
    title, body = parse_title_body(text)
    gt = hex_to_rgb(gradient_top)
    gb = hex_to_rgb(gradient_bottom)
    ac = hex_to_rgb(accent_hex)
    n = max(1, int(round(duration_sec * fps)))
    out_dir.mkdir(parents=True, exist_ok=True)
    for i in range(n):
        u = (i + 1) / n
        frame = render_frame(
            title=title or " ",
            body_lines=body,
            slide_index=slide_index,
            slide_total=slide_total,
            slide_id=slide_index,
            u=u,
            gradient_top=gt,
            gradient_bot=gb,
            accent=ac,
            icon_name=icon,
            icon_raster=icon_raster,
            icon_max_px=icon_max_px,
        )
        frame.save(out_dir / f"{i + 1:05d}.png", "PNG")


def cmd_animate(args: argparse.Namespace) -> None:
    manifest_path = Path(args.manifest)
    slides_dir = Path(args.slides_dir)
    frames_root = Path(args.frames_root)
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    fps = int(data.get("fps", 30))
    slides = data["slides"]
    total = len(slides)
    frames_root.mkdir(parents=True, exist_ok=True)
    for spec in slides:
        sid = int(spec["id"])
        tf = spec["textFile"]
        text = (slides_dir / tf).read_text(encoding="utf-8")
        sub = frames_root / f"slide_{sid:02d}"
        ac = hex_to_rgb(str(spec["accent"]))
        tint = bool(spec.get("iconTintAccent", False))
        png_path = resolve_icon_png_path(manifest_path, data, spec)
        icon_raster: Image.Image | None = None
        if png_path is not None:
            icon_raster = load_png_icon(png_path, ac, tint)
        icon_max = int(spec.get("iconMaxPx", ICON_MAX_DEFAULT_PX))
        render_animated_slide(
            text=text,
            slide_index=sid,
            slide_total=total,
            duration_sec=float(spec["durationSec"]),
            fps=fps,
            gradient_top=spec["gradientTop"],
            gradient_bottom=spec["gradientBottom"],
            accent_hex=spec["accent"],
            icon=spec["icon"],
            out_dir=sub,
            icon_raster=icon_raster,
            icon_max_px=max(32, icon_max),
        )
    print(f"Wrote animated frames under {frames_root}")


def main() -> None:
    import sys

    argv = sys.argv[1:]
    if argv[:1] == ["animate"]:
        p = argparse.ArgumentParser(prog=f"{Path(sys.argv[0]).name} animate")
        p.add_argument("animate", choices=["animate"])
        p.add_argument("--manifest", type=Path, required=True)
        p.add_argument("--slides-dir", type=Path, required=True)
        p.add_argument("--frames-root", type=Path, required=True)
        args = p.parse_args(argv)
        cmd_animate(args)
        return

    ap = argparse.ArgumentParser()
    ap.add_argument("--slides-dir", type=Path, required=True)
    ap.add_argument("--out-dir", type=Path, required=True)
    args = ap.parse_args(argv)
    for i in range(1, 9):
        src = args.slides_dir / f"{i:02d}.txt"
        if not src.is_file():
            raise SystemExit(f"Missing {src}")
        render_static_slide(
            src.read_text(encoding="utf-8"), args.out_dir / f"slide_{i:02d}.png", slide_id=i
        )
    print(f"Wrote 8 PNGs to {args.out_dir}")


if __name__ == "__main__":
    main()
