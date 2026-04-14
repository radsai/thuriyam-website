#!/usr/bin/env bash
# Composite Agent Builder demo onto a looping template.
#
# Default MODE=seamless: full-frame cover-crop + radial edge feather (alpha) so the template
# shows through at the borders — reads as one scene, not a hard “card” on top.
#
# MODE=inset: legacy picture-in-picture with black letterboxing (two-layer look).
#
# Env: TEMPLATE, CONTENT, OUT, OUT_FPS, MODE, INSET_PCT, FEATHER_RAD, FEATHER_GAMMA
# Inner opaque plate (template only bleeds outside this + feather): INNER_W_FRAC, INNER_H_FRAC, PLATE_FEATHER_PX
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="${TEMPLATE:-${ROOT}/docs/videos/AZ0e1XZX3z9EAjhi-pD3Gg-AZ0e1XZXNAwNyH2braPtbQ.mp4}"
CONTENT="${CONTENT:-${ROOT}/docs/videos/agent-builder-demo-features-plan.mp4}"
OUT="${OUT:-${ROOT}/docs/videos/agent-builder-demo-template-preview.mp4}"
OUT_FPS="${OUT_FPS:-30}"
MODE="${MODE:-seamless}"
INSET_PCT="${INSET_PCT:-88}"
FEATHER_RAD="${FEATHER_RAD:-0.46}"
FEATHER_GAMMA="${FEATHER_GAMMA:-0.62}"
INNER_W_FRAC="${INNER_W_FRAC:-0.82}"
INNER_H_FRAC="${INNER_H_FRAC:-0.76}"
PLATE_FEATHER_PX="${PLATE_FEATHER_PX:-56}"
MASK_GEN="${ROOT}/scripts/generate_feather_mask.py"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Template not found: $TEMPLATE" >&2
  exit 1
fi
if [[ ! -f "$CONTENT" ]]; then
  echo "Content demo not found: $CONTENT" >&2
  echo "Run: ./scripts/generate-agent-builder-demo-video.sh" >&2
  exit 1
fi

TW=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$TEMPLATE")
TH=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$TEMPLATE")

CONTENT_DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$CONTENT")
CONTENT_DUR=$(python3 -c "print(f'{max(0.1, float(\"$CONTENT_DUR\")):.3f}')")

mkdir -p "$(dirname "$OUT")"
TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

if [[ "$MODE" == "inset" ]]; then
  CW=$(( TW * INSET_PCT / 100 ))
  CH=$(( TH * INSET_PCT / 100 ))
  CW=$(( CW - CW % 2 ))
  CH=$(( CH - CH % 2 ))
  echo "MODE=inset | template ${TW}x${TH} | box ${CW}x${CH} | ${CONTENT_DUR}s | ${OUT_FPS}fps"
  ffmpeg -y -hide_banner -loglevel error \
    -stream_loop -1 -i "$TEMPLATE" -i "$CONTENT" \
    -filter_complex "\
[0:v]setpts=PTS-STARTPTS,fps=${OUT_FPS},scale=${TW}:${TH}:flags=lanczos,trim=duration=${CONTENT_DUR},setpts=PTS-STARTPTS[bg];\
[1:v]setpts=PTS-STARTPTS,fps=${OUT_FPS},\
scale=${CW}:${CH}:force_original_aspect_ratio=decrease:flags=lanczos,\
pad=${CW}:${CH}:(ow-iw)/2:(oh-ih)/2:color=black,trim=duration=${CONTENT_DUR},setpts=PTS-STARTPTS[fg];\
[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]" \
    -map "[outv]" -an \
    -t "$CONTENT_DUR" \
    -c:v libx264 -pix_fmt yuv420p -crf 23 -preset veryfast \
    -movflags +faststart \
    "$OUT"
else
  MASK="${TMP}/feather_mask.png"
  if ! python3 "$MASK_GEN" --width "$TW" --height "$TH" --out "$MASK" \
    --rad "$FEATHER_RAD" --gamma "$FEATHER_GAMMA" \
    --inner-w-frac "$INNER_W_FRAC" --inner-h-frac "$INNER_H_FRAC" \
    --plate-feather-px "$PLATE_FEATHER_PX" 2>/dev/null; then
    echo "Mask generation failed. pip install pillow (and optionally numpy)." >&2
    exit 1
  fi
  echo "MODE=seamless | ${TW}x${TH} | plate ${INNER_W_FRAC}x${INNER_H_FRAC} +${PLATE_FEATHER_PX}px | rad=${FEATHER_RAD} | ${CONTENT_DUR}s | ${OUT_FPS}fps"
  ffmpeg -y -hide_banner -loglevel error \
    -stream_loop -1 -i "$TEMPLATE" \
    -i "$CONTENT" \
    -loop 1 -framerate "$OUT_FPS" -i "$MASK" \
    -filter_complex "\
[0:v]setpts=PTS-STARTPTS,fps=${OUT_FPS},scale=${TW}:${TH}:flags=lanczos,trim=duration=${CONTENT_DUR},setpts=PTS-STARTPTS[bg];\
[1:v]setpts=PTS-STARTPTS,fps=${OUT_FPS},scale=${TW}:${TH}:force_original_aspect_ratio=increase:flags=lanczos,crop=${TW}:${TH}:(iw-ow)/2:(ih-oh)/2,trim=duration=${CONTENT_DUR},setpts=PTS-STARTPTS[fg0];\
[2:v]setpts=PTS-STARTPTS,fps=${OUT_FPS},scale=${TW}:${TH}:flags=lanczos,trim=duration=${CONTENT_DUR},setpts=PTS-STARTPTS[msk];\
[fg0][msk]alphamerge[fg];\
[bg][fg]overlay=0:0:format=auto[outv]" \
    -map "[outv]" -an \
    -t "$CONTENT_DUR" \
    -c:v libx264 -pix_fmt yuv420p -crf 23 -preset veryfast \
    -movflags +faststart \
    "$OUT"
fi

echo "Wrote $OUT"
