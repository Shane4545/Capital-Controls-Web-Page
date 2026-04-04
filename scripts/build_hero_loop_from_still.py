"""
Build assets/video/cci-hero-loop.mp4 from a CCI job photo (subtle zoom loop).

Uses only your still — no stock footage. Requires:
  pip install pillow imageio imageio-ffmpeg

Default source: assets/photos/wtp-rockland-actiflo-panel.jpg
"""
from __future__ import annotations

import math
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install pillow", file=sys.stderr)
    sys.exit(1)

try:
    import imageio.v2 as imageio
    import numpy as np
except ImportError:
    print("Install imageio numpy: pip install imageio imageio-ffmpeg numpy", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "assets" / "photos" / "wtp-rockland-actiflo-panel.jpg"
OUT = ROOT / "assets" / "video" / "cci-hero-loop.mp4"

# 720p, macro-block friendly (1280x720 divisible by 16)
OUT_W, OUT_H = 1280, 720
FPS = 24
DURATION_S = 12  # one full sine cycle = seamless loop


def frame_at_phase(im: Image.Image, phase: float) -> Image.Image:
    """phase in [0,1). Slow zoom centered on Actiflo panel area (slight right bias)."""
    w, h = im.size
    # zoom oscillates: nearly full frame -> slight punch-in -> back (loop-smooth)
    z_lo, z_hi = 1.0, 1.12
    z = z_lo + (z_hi - z_lo) * (0.5 + 0.5 * math.sin(phase * 2 * math.pi))

    crop_w = int(OUT_W * z)
    crop_h = int(OUT_H * z)
    scale = max(crop_w / w, crop_h / h)
    nw, nh = int(w * scale), int(h * scale)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)

    # focal bias ~55% / 45% (matches site object-position)
    cx = int(nw * 0.55)
    cy = int(nh * 0.45)
    left = max(0, min(cx - crop_w // 2, nw - crop_w))
    top = max(0, min(cy - crop_h // 2, nh - crop_h))
    cropped = resized.crop((left, top, left + crop_w, top + crop_h))
    return cropped.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    if not src.is_file():
        print("ERR missing source:", src, file=sys.stderr)
        sys.exit(1)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    n = int(FPS * DURATION_S)
    print("Building", n, "frames from", src.name, "->", OUT.name)

    writer = imageio.get_writer(
        str(OUT),
        fps=FPS,
        codec="libx264",
        quality=5,
        macro_block_size=16,
        ffmpeg_params=[
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-crf",
            "26",
            "-preset",
            "medium",
        ],
    )
    try:
        for i in range(n):
            phase = i / n
            frame = frame_at_phase(im, phase)
            writer.append_data(np.asarray(frame))
            if (i + 1) % FPS == 0:
                print(" ", i + 1, "/", n, "frames")
    finally:
        writer.close()

    size_mb = OUT.stat().st_size / (1024 * 1024)
    print("OK", OUT, f"({size_mb:.2f} MB)")


if __name__ == "__main__":
    main()
