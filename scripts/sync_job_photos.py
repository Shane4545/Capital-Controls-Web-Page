"""Resize job photos from H:\\Jobs into assets/photos. pip install pillow"""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip install pillow")

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets" / "photos"

JOBS = [
    (
        r"H:\Jobs\CCI1590 Bishop Water PLC Control Panel\CSA\CCI1590 CP-100\PHOTO\20250722_093215.jpg",
        "panel-csa-shop-primary.jpg",
    ),
    (
        r"H:\Jobs\CCI1590 Bishop Water PLC Control Panel\CSA\CCI1590 CP-100\PHOTO\20250723_105946.jpg",
        "panel-csa-shop-secondary.jpg",
    ),
    (
        r"H:\Jobs\CCI1662 INGLESIDE WWTP PHASE 1\CSA\CCI1662 CP-61\Photos\20260305_183943849_iOS.jpg",
        "wtp-ingleside-field.jpg",
    ),
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Pictures\Main Plant PLC 2.JPG",
        "wtp-rockland-main-plc.jpg",
    ),
    (
        r"H:\Jobs\CCI1567 OCWA East Rockland WTP SCADA Upgrade\Sales Documents\3358 Rockland-WTP-PLC Upgrade with SCADA\Specifications\Pictures\ACTIFLO_PANEL\IMG_7220.JPG",
        "wtp-rockland-actiflo-panel.jpg",
    ),
]


def save_web(src: str, out: Path, max_side: int = 2000, quality: int = 88) -> None:
    im = Image.open(src)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True)
    print("OK", out.name, im.size)


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    for src, name in JOBS:
        out = DEST / name
        try:
            save_web(src, out)
        except OSError as e:
            print("ERR", src, e)


if __name__ == "__main__":
    main()
