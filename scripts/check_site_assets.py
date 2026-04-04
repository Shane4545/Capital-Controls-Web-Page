"""Verify local asset paths referenced in *.html exist under repo root. Exit 1 if any missing."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = list(ROOT.glob("*.html"))

PATTERNS = [
    re.compile(r'src=["\'](assets/[^"\']+)["\']'),
    re.compile(r'href=["\'](assets/[^"\']+)["\']'),
    re.compile(r"url\(['\"]?(assets/[^'\"\s)]+)"),
]

seen: set[str] = set()
missing: list[str] = []


def check_ref(raw: str) -> None:
    path_part = raw.split("?", 1)[0].strip()
    if path_part in seen:
        return
    seen.add(path_part)
    if not path_part.startswith("assets/"):
        return
    p = ROOT / Path(path_part)
    if not p.is_file():
        missing.append(path_part)


def main() -> None:
    for f in HTML:
        text = f.read_text(encoding="utf-8", errors="replace")
        for pat in PATTERNS:
            for m in pat.finditer(text):
                check_ref(m.group(1))
    if missing:
        print("MISSING:", file=sys.stderr)
        for m in sorted(set(missing)):
            print(" ", m, file=sys.stderr)
        sys.exit(1)
    print("OK", len(seen), "unique assets/ paths checked across", len(HTML), "html files")


if __name__ == "__main__":
    main()
