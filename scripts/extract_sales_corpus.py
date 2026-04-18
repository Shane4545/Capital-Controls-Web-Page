"""
Walk H:\\Jobs\\*\\Sales Documents and extract text from PDFs/DOCX into one corpus file
for website content analysis.

Usage:
  python scripts/extract_sales_corpus.py
  python scripts/extract_sales_corpus.py --resume   # reuse existing per-job shards; rebuild master
"""
from __future__ import annotations

import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

JOBS_ROOT = Path(r"H:\Jobs")
OUT = Path(__file__).resolve().parents[1] / "assets" / "_sales_corpus.txt"
# Per-job shards (smaller files; run full scan overnight): assets/_sales_corpus_jobs/<job>.txt
OUT_JOBS_DIR = Path(__file__).resolve().parents[1] / "assets" / "_sales_corpus_jobs"
MAX_PDF_PAGES = 8  # per file — quotes often repeat boilerplate after page 1
MAX_FILE_MB = 12
SKIP_NAMES = re.compile(
    r"photo|image|img_|picture|\.png$|\.jpg$|\.jpeg$|\.gif$|\.zip$|\.dwg$|\.dxf$|\.mdb$|\.bak$",
    re.I,
)


def try_pdf(path: Path, sink) -> None:
    try:
        from pypdf import PdfReader
    except ImportError:
        print("pip install pypdf", file=sys.stderr)
        return
    if path.stat().st_size > MAX_FILE_MB * 1024 * 1024:
        sink.write(f"\n[SKIP large PDF {path.stat().st_size // 1024 // 1024}MB]\n")
        return
    sink.write("\n--- PDF ---\n")
    try:
        try:
            r = PdfReader(str(path), strict=False)
        except TypeError:
            r = PdfReader(str(path))
    except Exception as e:
        sink.write(f"\n[PDF OPEN ERROR: {e}]\n")
        return
    try:
        pages = r.pages[:MAX_PDF_PAGES]
    except Exception as e:
        sink.write(f"\n[PDF PAGES ERROR: {e}]\n")
        return
    for page in pages:
        try:
            t = page.extract_text() or ""
            sink.write(t)
            sink.write("\n")
        except Exception as e:
            sink.write(f"\n[PDF PAGE ERROR: {e}]\n")


def docx_plain(path: Path, sink) -> None:
    """Minimal DOCX text via XML (no python-docx)."""
    try:
        z = zipfile.ZipFile(path)
        xml = z.read("word/document.xml")
    except (KeyError, zipfile.BadZipFile, OSError):
        return
    root = ET.fromstring(xml)
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    texts = []
    for el in root.iter():
        if el.tag.endswith("}t") and el.text:
            texts.append(el.text)
        if el.tag.endswith("}tab"):
            texts.append("\t")
    sink.write(" ".join(texts))


def extract_one_job(job: Path, sink) -> tuple[int, int]:
    sd = job / "Sales Documents"
    if not sd.is_dir():
        return 0, 0
    files_processed = 0
    files_skipped = 0
    sink.write(f"\n\n{'='*80}\n# JOB: {job.name}\n{'='*80}\n")
    for f in sorted(sd.rglob("*")):
        if not f.is_file():
            continue
        if SKIP_NAMES.search(f.name):
            files_skipped += 1
            continue
        suf = f.suffix.lower()
        if suf not in (".pdf", ".docx"):
            files_skipped += 1
            continue
        rel = f.relative_to(sd)
        sink.write(f"\n--- FILE: {rel} ---\n")
        try:
            if suf == ".pdf":
                try_pdf(f, sink)
            else:
                sink.write("\n--- DOCX ---\n")
                docx_plain(f, sink)
                sink.write("\n")
            files_processed += 1
        except Exception as e:
            sink.write(f"\n[EXTRACT ERROR: {e}]\n")
    sink.flush()
    return files_processed, files_skipped


def main() -> None:
    resume = "--resume" in sys.argv
    if not JOBS_ROOT.is_dir():
        print("H:\\Jobs not found", file=sys.stderr)
        sys.exit(1)
    try:
        from pypdf import PdfReader  # noqa: F401
    except ImportError:
        import subprocess

        subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "-q"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT_JOBS_DIR.mkdir(parents=True, exist_ok=True)
    jobs_with_sd = 0
    files_processed = 0
    files_skipped = 0
    jobs_failed = 0
    jobs_resumed = 0

    # Materialize the full job list once; long runs on H: can otherwise see a partial iterdir().
    job_dirs = sorted(
        [
            p
            for p in JOBS_ROOT.iterdir()
            if p.is_dir() and (p / "Sales Documents").is_dir()
        ],
        key=lambda p: p.name.lower(),
    )

    with OUT.open("w", encoding="utf-8", errors="replace") as master:
        master.write("# Sales Documents corpus — Capital Controls (auto-generated)\n\n")
        for job in job_dirs:
            jobs_with_sd += 1
            safe = "".join(c if c not in '<>:"/\\|?*' else "_" for c in job.name)[:180]
            job_out = OUT_JOBS_DIR / f"{safe}.txt"
            err_marker = OUT_JOBS_DIR / f"{safe}.ERROR.txt"

            if resume and job_out.exists() and not err_marker.exists() and job_out.stat().st_size > 80:
                print(f"JOB {jobs_with_sd} (resume): {job.name}", flush=True, file=sys.stderr)
                try:
                    master.write(job_out.read_text(encoding="utf-8", errors="replace"))
                    master.write("\n")
                    master.flush()
                    jobs_resumed += 1
                    continue
                except OSError as e:
                    print(
                        f"Resume read failed, re-extracting {job.name}: {e!r}",
                        flush=True,
                        file=sys.stderr,
                    )

            if err_marker.exists():
                try:
                    err_marker.unlink()
                except OSError:
                    pass

            print(f"JOB {jobs_with_sd}: {job.name}", flush=True, file=sys.stderr)
            try:
                with job_out.open("w", encoding="utf-8", errors="replace") as jf:
                    proc, skip = extract_one_job(job, jf)
                files_processed += proc
                files_skipped += skip
                try:
                    err_marker.unlink()
                except OSError:
                    pass
                master.write(job_out.read_text(encoding="utf-8", errors="replace"))
                master.write("\n")
                master.flush()
            except Exception as e:
                jobs_failed += 1
                print(f"JOB FAILED {job.name}: {e!r}", flush=True, file=sys.stderr)
                err_marker.write_text(f"{e!r}\n", encoding="utf-8", errors="replace")
                stub = (
                    f"\n\n{'='*80}\n# JOB: {job.name}\n{'='*80}\n\n[EXTRACTION FAILED: {e}]\n"
                )
                job_out.write_text(stub, encoding="utf-8", errors="replace")
                master.write(stub)
                master.write("\n")
                master.flush()

    print(f"Jobs with Sales Documents: {jobs_with_sd}")
    if resume:
        print(f"Jobs resumed from disk: {jobs_resumed}")
    print(f"Files processed (pdf/docx): {files_processed}")
    print(f"Files skipped: {files_skipped}")
    if jobs_failed:
        print(f"Jobs with errors (see *.ERROR.txt): {jobs_failed}", file=sys.stderr)
    print(f"Master: {OUT}")
    print(f"Per-job folder: {OUT_JOBS_DIR}")


if __name__ == "__main__":
    main()
