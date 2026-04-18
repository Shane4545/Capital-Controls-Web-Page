"""
Deep image inventory for H:\\Jobs — fast pass (stat only), then PIL dims on top-N per category.

Run: python scripts/scan_h_jobs_images.py
Output: scripts/_h_jobs_image_scan.json
"""
from __future__ import annotations

import json
import os
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(r"H:\Jobs")
OUT = Path(__file__).resolve().parent / "_h_jobs_image_scan.json"
EXT = {".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"}
MIN_BYTES = 120_000
MAX_KEEP_IMAGES = 15_000
TOP_K_PER_CAT_FOR_DIMS = 40
# Path must include one of these segments (case-insensitive) — avoids scanning entire job trees on H:.
GOOD_PATH_SEGMENTS = frozenset(
    {
        "PHOTO",
        "PHOTOS",
        "PICTURES",
        "PICTURE",
        "IMAGES",
        "IMAGE",
        "CSA",
        "GRAPHICS",
        "SCREENSHOTS",
        "SCREENSHOT",
        "HMI",
        "SCADA",
        "FIELD",
        "SITE",
        "PICTURES",
    }
)
# Only walk CCI* job roots under H:\Jobs (full job archive; fast enough for complete pass)
JOB_PREFIX = "CCI"
# Prefer municipal / controls-relevant job folders first (name heuristic); widen if empty.
PINNED_SUBSTR = (
    "WTP",
    "WWTP",
    "SCADA",
    "PUMP",
    "STATION",
    "LRT",
    "TTC",
    "PANEL",
    "WATER",
    "TREATMENT",
    "OCWA",
    "INGLESIDE",
    "BISHOP",
    "CARLETON",
    "CUMBERLAND",
    "ROPEC",
    "PEMBROKE",
    "KILLALOE",
    "CHALK",
    "SUBDIVISION",
    "FLYGT",
    "XYLEM",
    "LIFT",
    "LEACHATE",
    "NAPANEE",
    "MERRICKVILLE",
    "DISINFECTION",
    "FILTRATION",
)
SKIP_DIR_NAMES = {"node_modules", ".git", "$recycle.bin", "system volume information"}

RULES: list[tuple[str, tuple[str, ...]]] = [
    ("plc_panels", ("plc", "rack", "compactlogix", "controllogix", "logix", "cpu", "chassis", "1769", "1756", "5069", "5380")),
    ("control_panels", ("control panel", "controlpanel", "cp-", "cp_", "panel build", "pump panel")),
    ("enclosures", ("enclosure", "csa", "mcc", "marshalling", "ul508", "508a", "shop", "fabrication")),
    ("scada_screens", ("scada", "hmi", "ifix", "wonderware", "factorytalk", "intouch", "screen shot", "screenshot", "graphics", "overview")),
    ("field_installations", ("field", "site work", "installation", "commissioning", "startup", "construction", "mechanical complete")),
    ("wet_well_pump", ("wet well", "wetwell", "lift station", "liftstation", "pump station", "flygt", "multismart", "submersible", "booster")),
]


def categorize(path_lower: str) -> set[str]:
    cats: set[str] = set()
    for name, needles in RULES:
        if any(n in path_lower for n in needles):
            cats.add(name)
    return cats


def try_dims(p: Path) -> tuple[int | None, int | None]:
    try:
        from PIL import Image

        with Image.open(p) as im:
            return im.size
    except Exception:
        return None, None


def main() -> int:
    if not ROOT.is_dir():
        print("FAIL: not a directory:", ROOT)
        return 2

    job_roots = []
    all_cci = []
    for p in sorted(ROOT.iterdir(), key=lambda x: x.name):
        if not p.is_dir():
            continue
        nu = p.name.upper()
        if nu == "CCI" or not nu.startswith(JOB_PREFIX):
            continue
        all_cci.append(p)
        if any(s in nu for s in PINNED_SUBSTR):
            job_roots.append(p)
    if len(job_roots) < 8:
        job_roots = all_cci

    def path_has_good_segment(fp: Path) -> bool:
        for part in fp.parts:
            if part.upper().replace(" ", "") in GOOD_PATH_SEGMENTS or part.upper() in GOOD_PATH_SEGMENTS:
                return True
        return False

    raw: list[dict] = []
    stop = False
    for jr in job_roots:
        if stop:
            break
        for fp in jr.rglob("*"):
            if len(raw) >= MAX_KEEP_IMAGES:
                stop = True
                break
            if not fp.is_file():
                continue
            if fp.suffix not in EXT:
                continue
            if not path_has_good_segment(fp):
                continue
            try:
                st = fp.stat()
            except OSError:
                continue
            if st.st_size < MIN_BYTES:
                continue
            path_str = str(fp)
            lower = path_str.lower()
            cats = categorize(lower)
            raw.append(
                {
                    "path": path_str,
                    "bytes": st.st_size,
                    "categories": sorted(cats),
                }
            )

    raw.sort(key=lambda e: e["bytes"], reverse=True)

    by_cat: dict[str, list[dict]] = defaultdict(list)
    for e in raw:
        if not e["categories"]:
            by_cat["_uncategorized"].append({**e})
            continue
        for c in e["categories"]:
            by_cat[c].append({**e})

    for c in by_cat:
        by_cat[c].sort(key=lambda e: e["bytes"], reverse=True)
        by_cat[c] = by_cat[c][: TOP_K_PER_CAT_FOR_DIMS * 2]

    # Dims only for top candidates per category
    enriched: dict[str, list[dict]] = {}
    for cat, rows in by_cat.items():
        out_rows = []
        for e in rows[:TOP_K_PER_CAT_FOR_DIMS]:
            p = Path(e["path"])
            w, h = try_dims(p)
            mp = round(w * h / 1_000_000, 2) if w and h else None
            out_rows.append({**e, "width": w, "height": h, "megapixels": mp})
        out_rows.sort(
            key=lambda x: (x.get("megapixels") or 0, x["bytes"]),
            reverse=True,
        )
        enriched[cat] = out_rows

    report = {
        "root": str(ROOT),
        "jobRootsScanned": [str(p) for p in job_roots],
        "generatedUtc": datetime.now(timezone.utc).isoformat(),
        "minBytes": MIN_BYTES,
        "filesStatMatched": len(raw),
        "topByCategory": enriched,
    }
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print("Wrote", OUT)

    for cat in (
        "plc_panels",
        "control_panels",
        "enclosures",
        "scada_screens",
        "field_installations",
        "wet_well_pump",
    ):
        rows = enriched.get(cat, [])
        print(f"\n=== {cat} (top {len(rows)}) ===")
        for e in rows[:15]:
            print(
                f"  {e.get('megapixels') or '?'} MP  {e['bytes'] // 1024} KB  {e['path'][:130]}"
            )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
