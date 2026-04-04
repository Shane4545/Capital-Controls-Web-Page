CCI homepage hero video — filename
====================================
The cinematic homepage loads:

    cci-hero-loop.mp4

Regenerate from your own still (no stock), from repo root:

    pip install pillow imageio imageio-ffmpeg numpy
    python scripts/build_hero_loop_from_still.py

Default still: assets/photos/wtp-rockland-actiflo-panel.jpg
Optional: python scripts/build_hero_loop_from_still.py path\to\other.jpg

To replace with real footage later: overwrite cci-hero-loop.mp4 with your H.264
export (muted, 720p/1080p), then commit.
