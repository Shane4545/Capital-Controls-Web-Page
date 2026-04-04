CCI homepage hero video — filename
====================================
The cinematic homepage loads:

    cci-hero-loop.mp4

AI build (image-to-video from your CCI photo — Replicate Stable Video Diffusion, HTTP API):

    set REPLICATE_API_TOKEN=your_token
    pip install requests pillow imageio-ffmpeg
    python scripts/build_hero_loop_ai.py

See assets/video/SOURCE.txt for full lineage and fallback.

Non-AI fallback (Ken Burns from the same still), from repo root:

    pip install pillow imageio imageio-ffmpeg numpy
    python scripts/build_hero_loop_from_still.py

Default still: assets/photos/wtp-rockland-actiflo-panel.jpg
Optional: python scripts/build_hero_loop_ai.py path\to\other.jpg

After changing the file, bump ?v= in cinematic-home.js (CCI_HERO_MP4).

To replace with hand-edited footage: overwrite cci-hero-loop.mp4 with your H.264
export (muted, 720p/1080p), then commit.
