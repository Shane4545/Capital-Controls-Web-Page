CCI Panels — shop photos and reference clips
==============================================

On the website we use **still images only** (no embedded video). The **.MOV**
files here are **source material**: scrub them for sharp frames, photogrammetry
reference, or 3D texture / lighting reference when you build graphics in
Blender, etc.—not played back in the browser.

Homepage mapping (index.html)
------------------------------
  Home 1.jpg     — Top hero full-bleed still
  Home 2.jpg     — Bento large “Fabrication” tile
  Home 3.jpg … Home 5.jpg — Bento cluster tiles
  Panel Pic 1.jpg — Fourth cluster tile (“Detail”)

Also: Panel Pic 2.jpg, iPhone .MOV clips, extra JPG — keep for your pipeline;
they are not linked from HTML unless you add them.

Grab stills from .MOV (for 3D / composites)
---------------------------------------------
  • macOS: Preview — scrub, Export as PNG.
  • Windows: Photos / Clipchamp / VLC → snapshot.
  • With ffmpeg: ffmpeg -i "file.MOV" -ss 00:00:02 -vframes 1 ref.png

Optional 3D later (free)
------------------------
  • Blender → glTF → Google model-viewer on a page, or baked renders exported as JPG/WEBP.
