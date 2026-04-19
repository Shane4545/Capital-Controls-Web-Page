CCI homepage hero video (production)
====================================
The static site loads this file from index.html:

    pumping-panel-walkthrough.mp4

Poster image:

    pumping-panel-walkthrough-poster.jpg

The homepage hero uses the still frame pumping-panel-walkthrough-poster.jpg (no autoplay video). The MP4 remains available for other uses if needed.

Optional internal builds (do not change the live wiring unless you update index.html):

    python scripts/build_hero_loop_from_still.py
    python scripts/build_hero_loop_ai.py   # requires REPLICATE_API_TOKEN

Those scripts write a filename defined in each script; the production homepage only
uses pumping-panel-walkthrough.mp4 unless you explicitly change index.html and
bump cache-bust query parameters.

After replacing the walkthrough MP4, bump the ?v= query on cinematic-home.css / index.html script links as needed for cache busting on GitHub Pages.
