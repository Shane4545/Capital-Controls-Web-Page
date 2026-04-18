"""Apply EXIF orientation to pixel data and re-save (in-place) for web reliability."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent

CANDIDATES = [
    ROOT / "CCI Panels" / "Home 1.jpg",
    ROOT / "CCI Panels" / "Home 2.jpg",
    ROOT / "CCI Panels" / "Home 3.jpg",
    ROOT / "CCI Panels" / "Home 5.jpg",
    ROOT / "assets" / "photos" / "field-chalk-river-upgrade.jpg",
    ROOT / "assets" / "photos" / "field-work.jpg",
    ROOT / "assets" / "photos" / "gallery-chalk-river-filters.jpg",
    ROOT / "assets" / "photos" / "hero-installation.jpg",
    ROOT / "assets" / "photos" / "plc-scada-site.jpg",
    ROOT / "assets" / "photos" / "site-work-2.jpg",
]


def main() -> None:
    for path in CANDIDATES:
        if not path.is_file():
            print(f"skip missing: {path}")
            continue
        with Image.open(path) as im:
            exif = im.getexif()
            ori = exif.get(274, 1) if exif else 1
            if ori in (None, 1):
                print(f"skip ori={ori}: {path.relative_to(ROOT)}")
                continue
            out = ImageOps.exif_transpose(im)
            out.save(path, format="JPEG", quality=92, optimize=True, subsampling=0)
            print(f"normalized ori={ori} -> {path.relative_to(ROOT)} {out.size}")


if __name__ == "__main__":
    main()
