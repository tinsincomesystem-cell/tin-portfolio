#!/usr/bin/env bash
# Turns a video of Tin (e.g. from Higgsfield) into transparent WebP frames for the hero.
# Usage:  tools/make-hero-frames.sh path/to/clip.mp4 [fps]
# Needs:  ffmpeg, and Python rembg (pip install "rembg[cpu]")
# After:  set hero.frames.count in src/content/site.yaml to the number printed at the end.
set -euo pipefail
CLIP="$1"; FPS="${2:-15}"
OUT="public/hero-frames"; TMP="$(mktemp -d)"
mkdir -p "$OUT"
ffmpeg -v error -i "$CLIP" -vf "fps=${FPS},scale=-2:1280" "$TMP/raw-%03d.png"
python3 - "$TMP" "$OUT" <<'PY'
import sys, glob, os
from rembg import remove, new_session
from PIL import Image
tmp, out = sys.argv[1], sys.argv[2]
s = new_session("birefnet-portrait")
files = sorted(glob.glob(os.path.join(tmp, "raw-*.png")))
for i, f in enumerate(files, 1):
    im = remove(Image.open(f).convert("RGB"), session=s, post_process_mask=True)
    im.save(os.path.join(out, f"frame-{i:03d}.webp"), "WEBP", quality=82, method=6)
    print(f"\rframe {i}/{len(files)}", end="", flush=True)
print(f"\nDone: {len(files)} frames in {out}. Set hero.frames.count: {len(files)} in site.yaml")
PY
