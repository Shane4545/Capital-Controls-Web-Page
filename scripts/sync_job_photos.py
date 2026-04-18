"""Resize job photos from H:\\Jobs into assets/photos.

Run: pip install pillow && python scripts/sync_job_photos.py

Flagship WebGL assets use higher max_side; see JOBS entries with flagship_ prefix
in output filenames. Originals are OCWA East Rockland Pictures (PLC / filter trains)
and Bishop CSA PHOTO (shop panels).
"""
from __future__ import annotations

from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    raise SystemExit("Install Pillow: pip install pillow")

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets" / "photos"

# Each entry: src on H:\\Jobs, dest filename in assets/photos, max longest edge, jpeg quality
JOBS: list[tuple[str, str, int, int]] = [
    (
        r"H:\Jobs\CCI1590 Bishop Water PLC Control Panel\CSA\CCI1590 CP-100\PHOTO\20250722_093215.jpg",
        "panel-csa-shop-primary.jpg",
        4000,
        90,
    ),
    (
        r"H:\Jobs\CCI1590 Bishop Water PLC Control Panel\CSA\CCI1590 CP-100\PHOTO\20250723_105946.jpg",
        "panel-csa-shop-secondary.jpg",
        4000,
        90,
    ),
    (
        r"H:\Jobs\CCI1662 INGLESIDE WWTP PHASE 1\CSA\CCI1662 CP-61\Photos\20260305_183943849_iOS.jpg",
        "wtp-ingleside-field.jpg",
        2400,
        88,
    ),
    # Full-resolution Rockland captures (~59 MB masters) — Main Plant PLC 1 preferred over PLC 2 for rack detail.
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Pictures\Main Plant PLC 1.JPG",
        "wtp-rockland-main-plc.jpg",
        3200,
        90,
    ),
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Sales Documents\3358 Rockland-WTP-PLC Upgrade with SCADA\Specifications\Pictures\ACTIFLO_PANEL\IMG_7220.JPG",
        "wtp-rockland-actiflo-panel.jpg",
        2400,
        88,
    ),
    # Homepage WebGL / manifest — longest edge 4096 for crisp texture panels in Three.js
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Pictures\Main Plant PLC 1.JPG",
        "flagship-rockland-plc-rack.jpg",
        4096,
        92,
    ),
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Pictures\Filter panel 1.JPG",
        "flagship-rockland-filter-process.jpg",
        4096,
        92,
    ),
]

# PNG SCADA/HMI: keep alpha if present; downsample for web / WebGL texture weight
FLAGSHIP_SCADA_PNG: tuple[str, str, int] = (
    r"H:\Jobs\CCI1603 B&M Ottawa DWS SCADA Network\CSA\CCI1603 Glen Cairn\PICTURE\20250710_135035.png",
    "flagship-scada-glen-cairn-dws.png",
    4096,
)


def save_web(src: str, out: Path, max_side: int, quality: int) -> None:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True)
    print("OK", out.name, im.size, "from", Path(src).name)


def save_png_max_side(src: str, out: Path, max_side: int) -> None:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(out, "PNG", optimize=True, compress_level=6)
    print("OK", out.name, im.size, "from", Path(src).name)


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    for src, name, max_side, quality in JOBS:
        out = DEST / name
        try:
            save_web(src, out, max_side, quality)
        except OSError as e:
            print("ERR", src, e)
    src_scada, name_scada, ms = FLAGSHIP_SCADA_PNG
    try:
        save_png_max_side(src_scada, DEST / name_scada, ms)
    except OSError as e:
        print("ERR", src_scada, e)


if __name__ == "__main__":
    main()
