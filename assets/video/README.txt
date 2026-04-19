CCI homepage hero video (production)
====================================
The static site loads this file from index.html:

    pumping-panel-walkthrough.mp4

Poster image:

    pumping-panel-walkthrough-poster.jpg

Playback is controlled by cinematic-home.js (targets [data-home-hero-video] inside .home-proof-hero).

Optional internal builds (do not change the live wiring unless you update index.html):

    python scripts/build_hero_loop_from_still.py
    python scripts/build_hero_loop_ai.py   # requires REPLICATE_API_TOKEN

Those scripts can produce cci-hero-loop.mp4 for optional/future use; the homepage does not reference that filename in HTML or active JS.

After replacing the walkthrough MP4, bump the ?v= query on cinematic-home.css / index.html script links as needed for cache busting on GitHub Pages.
