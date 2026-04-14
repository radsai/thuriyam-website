#!/usr/bin/env bash
# Agent Builder demo MP4: animated gradients, icons, text motion (Pillow) + ffmpeg + xfade.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SLIDES="${ROOT}/scripts/agent-builder-demo-slides"
MANIFEST="${ROOT}/scripts/agent-builder-demo-manifest.json"
RENDER="${ROOT}/scripts/render_agent_builder_demo_slides.py"
XFADE="${ROOT}/scripts/concat_parts_xfade.py"
OUT_DIR="${ROOT}/docs/videos"
OUT_FILE="${OUT_FILE:-${OUT_DIR}/agent-builder-demo-features-plan.mp4}"
FPS="${FPS:-30}"

mkdir -p "$OUT_DIR"
TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

if ! python3 -c "from PIL import Image" 2>/dev/null; then
  echo "Installing Pillow (pip) for slide rendering…" >&2
  python3 -m pip install --user -q pillow
fi

FRAMES="${TMP}/frames"
python3 "$RENDER" animate --manifest "$MANIFEST" --slides-dir "$SLIDES" --frames-root "$FRAMES"

for i in $(seq 1 8); do
  dir="${FRAMES}/slide_$(printf '%02d' "$i")"
  out="${TMP}/part$(printf '%02d' "$i").mp4"
  ffmpeg -y -hide_banner -loglevel error \
    -framerate "$FPS" -i "${dir}/%05d.png" \
    -c:v libx264 -pix_fmt yuv420p \
    "$out"
done

PARTS=("${TMP}/part01.mp4" "${TMP}/part02.mp4" "${TMP}/part03.mp4" "${TMP}/part04.mp4" "${TMP}/part05.mp4" "${TMP}/part06.mp4" "${TMP}/part07.mp4" "${TMP}/part08.mp4")
python3 "$XFADE" --manifest "$MANIFEST" --out "$OUT_FILE" "${PARTS[@]}"
