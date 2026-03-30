"""Fast counts for H:\\Jobs\\*\\Sales Documents (os.walk)."""
from __future__ import annotations

import json
import os
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

JOBS = Path(r"H:\Jobs")
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "_sales_file_index.json"
OUT_TXT = ROOT / "assets" / "_sales_file_index_summary.txt"
WEB_STATS = ROOT / "assets" / "sales-stats.json"

KEYWORDS = [
    "quotation", "quote", "proposal", "specification", "scope", "bom",
    "panel", "plc", "scada", "hmi", "vfd", "mcc", "instrument", "calibrat",
    "programming", "engineering", "design", "commission", "fat", "sat",
    "drawing", "autocad", "rockwell", "allen", "wonderware", "ifix",
    "factorytalk", "radio", "cellular", "vpn", "network", "csa",
    "pumping", "lift", "wtp", "wwtp", "treatment",
]


def main() -> None:
    if not JOBS.is_dir():
        raise SystemExit("H:\\Jobs not found")

    ext_counts: Counter[str] = Counter()
    keyword_hits: Counter[str] = Counter()
    jobs_rows: list[dict] = []
    total_files = 0

    for job in sorted(JOBS.iterdir(), key=lambda p: p.name.lower()):
        if not job.is_dir():
            continue
        sd = job / "Sales Documents"
        if not sd.is_dir():
            continue
        n = 0
        sd_s = str(sd)
        for dirpath, _dirnames, filenames in os.walk(sd_s):
            for name in filenames:
                total_files += 1
                n += 1
                ext = Path(name).suffix.lower() or "(noext)"
                ext_counts[ext] += 1
                low = name.lower()
                rel = os.path.relpath(os.path.join(dirpath, name), sd_s).lower()
                blob = rel + " " + low
                for kw in KEYWORDS:
                    if kw in blob:
                        keyword_hits[kw] += 1
        jobs_rows.append({"job": job.name, "file_count": n})

    jobs_rows.sort(key=lambda r: r["file_count"], reverse=True)

    payload = {
        "total_jobs_with_sales_documents": len(jobs_rows),
        "total_files": total_files,
        "extension_counts": dict(ext_counts.most_common(20)),
        "keyword_hits_in_paths": dict(keyword_hits.most_common()),
        "jobs_by_file_count": jobs_rows,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    web = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "H:\\Jobs\\*\\Sales Documents",
        "jobsWithSalesDocuments": len(jobs_rows),
        "totalFiles": total_files,
        "pdfFiles": int(ext_counts.get(".pdf", 0)),
        "docxFiles": int(ext_counts.get(".docx", 0)),
        "docFiles": int(ext_counts.get(".doc", 0)),
        "xlsxFiles": int(ext_counts.get(".xlsx", 0)),
        "xlsFiles": int(ext_counts.get(".xls", 0)),
        "extensionsTop": [{"ext": k, "count": v} for k, v in ext_counts.most_common(12)],
        "keywordsTop": [{"keyword": k, "count": v} for k, v in keyword_hits.most_common(18)],
        "topJobsByFileCount": jobs_rows[:30],
    }
    WEB_STATS.write_text(json.dumps(web, indent=2), encoding="utf-8")

    lines = [
        f"Jobs with 'Sales Documents': {len(jobs_rows)}",
        f"Total files: {total_files}",
        "",
        "Top extensions:",
        *[f"  {k}: {v}" for k, v in ext_counts.most_common(12)],
        "",
        "Keywords in relative paths:",
        *[f"  {k}: {v}" for k, v in keyword_hits.most_common(25)],
        "",
        "Top 15 jobs by file count:",
        *[f"  {r['job']}: {r['file_count']}" for r in jobs_rows[:15]],
    ]
    OUT_TXT.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines))
    print(f"\nWrote {OUT}")
    print(f"Wrote {WEB_STATS} (for services page)")


if __name__ == "__main__":
    main()
