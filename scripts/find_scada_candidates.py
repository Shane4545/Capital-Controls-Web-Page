"""
Find SCADA/HMI raster candidates under H:\\Jobs — stat-only sweep, then PIL on top 60.

Run: python scripts/find_scada_candidates.py
Writes: scripts/_scada_candidates.json
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(r"H:\Jobs")
OUT = Path(__file__).resolve().parent / "_scada_candidates.json"
EXT_OK = {".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"}
MIN_BYTES = 100_000
MAX_DEPTH = 14
MAX_FOR_PIL = 60

EXCLUDE_SUBSTR = (
    "\\help\\",
    "/help/",
    "\\samples\\",
    "\\sample\\",
    "keyboardpanel",
    "ifix\\help",
    "/ifix/help",
    "\\icons\\",
    "/icons/",
    "emoji",
    "splash",
    "thumbs.db",
    "readme",
    "template",
)

INCLUDE_SUBSTR = (
    "scada",
    "hmi",
    "ifix",
    "wonderware",
    "factorytalk",
    "intouch",
    "graphic",
    "mimic",
    "overview",
    "screen",
    "screenshot",
    "alarm",
    "display",
    "operator",
    "pump",
    "trend",
    "process",
    "wwtp",
    "wtp",
    "faceplate",
    "station",
    "level",
    "wet well",
    "lift",
)

SEGMENT_OK = frozenset(
    {
        "GRAPHICS",
        "GRAPHIC",
        "HMI",
        "SCADA",
        "SCREENSHOTS",
        "SCREENSHOT",
        "MIMICS",
    }
)

def discover_job_roots() -> list[Path]:
    """Only *SCADA* + a few adjacent WTP/CC jobs — complete enough for exports without full H: crawl."""
    roots: list[Path] = []
    for p in sorted(ROOT.glob("CCI*SCADA*")):
        if p.is_dir():
            roots.append(p)
    extra = (
        ROOT / "CCI-1677 Carlteton Place WTP WWTP Upgrade",
        ROOT / "CCI1692 Pembroke - Pembroke WPP Filter Upgrades",
    )
    for p in extra:
        if p.is_dir():
            roots.append(p)
    # Dedupe
    seen: set[str] = set()
    out: list[Path] = []
    for p in roots:
        k = str(p.resolve())
        if k not in seen:
            seen.add(k)
            out.append(p)
    return out


def looks_like_candidate(path_str: str) -> bool:
    lower = path_str.lower()
    if any(x in lower for x in EXCLUDE_SUBSTR):
        return False
    parts_u = {p.upper() for p in Path(path_str).parts}
    if parts_u & SEGMENT_OK:
        return True
    if any(x in lower for x in INCLUDE_SUBSTR):
        return True
    return False


def path_priority(path_str: str) -> int:
    u = path_str.upper()
    if "\\GRAPHICS\\" in u or "/GRAPHICS/" in u:
        return 0
    if "\\HMI\\" in u or "\\SCADA\\" in u:
        return 1
    if "SCREENSHOT" in u:
        return 2
    if "MIMIC" in u or "OVERVIEW" in u:
        return 3
    return 9


def try_dims(p: Path) -> tuple[int | None, int | None]:
    try:
        from PIL import Image

        with Image.open(p) as im:
            return im.size
    except Exception:
        return None, None


def main() -> int:
    if not ROOT.is_dir():
        print("FAIL", ROOT)
        return 2

    raw: list[tuple[int, str]] = []
    job_dirs = discover_job_roots()
    for jr in job_dirs:
        root_prefix = str(jr)
        for dirpath, dirnames, filenames in os.walk(jr, topdown=True):
            rel = dirpath[len(root_prefix) :].lstrip("\\/")
            depth = 0 if not rel else rel.count(os.sep) + 1
            if depth > MAX_DEPTH:
                dirnames[:] = []
                continue
            dnl = dirpath.lower()
            if "\\proficy" in dnl and "\\help" in dnl:
                dirnames[:] = []
                continue
            if "site usb dongle" in dnl or "\\samples\\" in dnl:
                dirnames[:] = []
                continue
            # Prune vendor / OS noise before descending
            skip_dir = {
                "help",
                "samples",
                "sample",
                "node_modules",
                ".git",
            }
            dirnames[:] = [
                d
                for d in dirnames
                if d.lower() not in skip_dir
                and "usb dongle" not in d.lower()
                and d.upper() != "HELP"
            ]
            for fn in filenames:
                sfx = Path(fn).suffix
                if sfx not in EXT_OK:
                    continue
                fp = Path(dirpath) / fn
                ps = str(fp)
                if not looks_like_candidate(ps):
                    continue
                try:
                    sz = fp.stat().st_size
                except OSError:
                    continue
                if sz < MIN_BYTES:
                    continue
                raw.append((sz, ps))

    raw.sort(key=lambda x: -x[0])
    # Deduplicate paths
    seen: set[str] = set()
    by_size: list[tuple[int, str]] = []
    for sz, ps in raw:
        if ps in seen:
            continue
        seen.add(ps)
        by_size.append((sz, ps))

    top_stat = by_size[:120]
    enriched: list[dict] = []
    for sz, ps in top_stat[:MAX_FOR_PIL]:
        w, h = try_dims(Path(ps))
        mp = round(w * h / 1_000_000, 3) if w and h else 0.0
        enriched.append(
            {
                "path": ps,
                "bytes": sz,
                "width": w,
                "height": h,
                "megapixels": mp,
                "prio": path_priority(ps),
            }
        )

    enriched.sort(
        key=lambda x: (-x["megapixels"], -x["bytes"], x["prio"], x["path"])
    )

    report = {
        "generatedUtc": datetime.now(timezone.utc).isoformat(),
        "jobRoots": [str(p) for p in job_dirs],
        "totalStatHits": len(by_size),
        "top": enriched,
    }
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print("stat_hits", len(by_size), "enriched", len(enriched))
    for i, c in enumerate(enriched[:18], 1):
        print(f"{i}. {c['megapixels']}MP {c['bytes']//1024}KB p{c['prio']}", c["path"][:115])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
