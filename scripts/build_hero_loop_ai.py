"""
Build assets/video/cci-hero-loop.mp4 from a CCI still using AI image-to-video (Replicate).

Uses the public model christophy/stable-video-diffusion (Stable Video Diffusion) via the
Replicate HTTP API — no `replicate` Python package (keeps Python 3.14+ working).

Requires:
  set REPLICATE_API_TOKEN=...   (https://replicate.com/account/api-tokens)
  pip install requests pillow imageio-ffmpeg

Replicate accepts input images as HTTP URLs or data URLs; data URLs are limited to ~256 KB,
so larger job photos are re-encoded smaller before the API call (same scene, lower weight).

Without a token, falls back to Ken Burns from the same still:
  python scripts/build_hero_loop_from_still.py

Default source still: assets/photos/wtp-rockland-actiflo-panel.jpg
"""
from __future__ import annotations

import base64
import io
import os
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "assets" / "photos" / "wtp-rockland-actiflo-panel.jpg"
OUT = ROOT / "assets" / "video" / "cci-hero-loop.mp4"
STILL_SCRIPT = ROOT / "scripts" / "build_hero_loop_from_still.py"

OUT_W, OUT_H = 1280, 720
TARGET_DURATION_S = 12
MODEL_OWNER = "christophy"
MODEL_NAME = "stable-video-diffusion"
PREDICTIONS_URL = f"https://api.replicate.com/v1/models/{MODEL_OWNER}/{MODEL_NAME}/predictions"
# Data URL size budget (Replicate docs: use data URL when file <= ~256 KB)
MAX_DATA_URL_BYTES = 250_000


def _ffmpeg_exe() -> str:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        print("Install imageio-ffmpeg: pip install imageio-ffmpeg", file=sys.stderr)
        sys.exit(1)


def run_fallback_still(src: Path) -> None:
    print(
        "No REPLICATE_API_TOKEN; using Ken Burns fallback from still.",
        flush=True,
    )
    r = subprocess.run([sys.executable, str(STILL_SCRIPT), str(src)], cwd=str(ROOT))
    if r.returncode != 0:
        sys.exit(r.returncode or 1)
    print("OK (non-AI fallback)", OUT, flush=True)


def jpeg_data_url_under_limit(src: Path) -> str:
    """Return data:image/jpeg;base64,... suitable for Replicate input_image."""
    raw = src.read_bytes()
    if len(raw) <= MAX_DATA_URL_BYTES:
        b64 = base64.standard_b64encode(raw).decode("ascii")
        return f"data:image/jpeg;base64,{b64}"

    try:
        from PIL import Image
    except ImportError:
        print("Install Pillow to compress large photos: pip install pillow", file=sys.stderr)
        sys.exit(1)

    im = Image.open(src).convert("RGB")
    w, h = im.size
    if max(w, h) > 1280:
        scale = 1280 / max(w, h)
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    for q in (88, 80, 72, 64, 56, 48):
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=q, optimize=True)
        data = buf.getvalue()
        if len(data) <= MAX_DATA_URL_BYTES:
            b64 = base64.standard_b64encode(data).decode("ascii")
            print(
                f"Compressed source for API: {src.name} -> {len(data) // 1024} KB (q={q})",
                flush=True,
            )
            return f"data:image/jpeg;base64,{b64}"

    im_small = im.resize((768, int(im.height * 768 / im.width)), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    im_small.save(buf, format="JPEG", quality=72, optimize=True)
    data = buf.getvalue()
    if len(data) > MAX_DATA_URL_BYTES:
        print("ERR could not fit image under API data-URL limit", file=sys.stderr)
        sys.exit(1)
    b64 = base64.standard_b64encode(data).decode("ascii")
    print(
        f"Compressed source for API: {src.name} -> {len(data) // 1024} KB (768px)",
        flush=True,
    )
    return f"data:image/jpeg;base64,{b64}"


def normalize_and_loop_ai_clip(src_mp4: Path, dst: Path) -> None:
    """Loop short SVD clip to TARGET_DURATION_S, scale/pad to 720p, yuv420p + faststart, muted."""
    ffmpeg = _ffmpeg_exe()
    vf = (
        f"scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=decrease,"
        f"pad={OUT_W}:{OUT_H}:(ow-iw)/2:(oh-ih)/2,"
        "format=yuv420p"
    )
    cmd = [
        ffmpeg,
        "-y",
        "-stream_loop",
        "-1",
        "-i",
        str(src_mp4),
        "-t",
        str(TARGET_DURATION_S),
        "-vf",
        vf,
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "26",
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        str(dst),
    ]
    print("Re-encoding with bundled ffmpeg...", flush=True)
    subprocess.run(cmd, check=True, cwd=str(ROOT))


def replicate_run_svd(token: str, input_image_data_url: str) -> str:
    try:
        import requests
    except ImportError:
        print("Install requests: pip install requests", file=sys.stderr)
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    body = {
        "input": {
            "input_image": input_image_data_url,
            "video_length": "14_frames_with_svd",
            "sizing_strategy": "maintain_aspect_ratio",
            "frames_per_second": 6,
            "motion_bucket_id": 95,
            "cond_aug": 0.02,
            "decoding_t": 14,
        }
    }
    print(
        f"POST {MODEL_OWNER}/{MODEL_NAME} (SVD) — may take a few minutes...",
        flush=True,
    )
    r = requests.post(PREDICTIONS_URL, headers=headers, json=body, timeout=120)
    if not r.ok:
        print(r.status_code, r.text[:2000], file=sys.stderr)
        r.raise_for_status()
    pred = r.json()
    get_url = pred.get("urls", {}).get("get")
    if not get_url:
        print("ERR missing prediction URL:", pred, file=sys.stderr)
        sys.exit(1)

    deadline = time.time() + 900
    while time.time() < deadline:
        gr = requests.get(get_url, headers=headers, timeout=60)
        gr.raise_for_status()
        p = gr.json()
        st = p.get("status")
        if st == "succeeded":
            out = p.get("output")
            if not out or not isinstance(out, str):
                print("ERR bad output:", p, file=sys.stderr)
                sys.exit(1)
            return out
        if st in ("failed", "canceled"):
            print("ERR prediction", st, p.get("error"), file=sys.stderr)
            sys.exit(1)
        time.sleep(3)

    print("ERR prediction timed out", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    if not src.is_file():
        print("ERR missing source:", src, file=sys.stderr)
        sys.exit(1)

    token = os.environ.get("REPLICATE_API_TOKEN", "").strip()
    if not token:
        run_fallback_still(src)
        return

    OUT.parent.mkdir(parents=True, exist_ok=True)

    data_url = jpeg_data_url_under_limit(src)
    out_mp4_url = replicate_run_svd(token, data_url)

    try:
        import requests
    except ImportError:
        print("Install requests: pip install requests", file=sys.stderr)
        sys.exit(1)

    tmp = OUT.with_suffix(".tmp-replicate.mp4")
    try:
        print("Downloading result...", flush=True)
        dr = requests.get(
            out_mp4_url,
            headers={"Authorization": f"Bearer {token}"},
            timeout=300,
        )
        dr.raise_for_status()
        tmp.write_bytes(dr.content)
        normalize_and_loop_ai_clip(tmp, OUT)
    finally:
        try:
            tmp.unlink(missing_ok=True)
        except OSError:
            pass

    size_mb = OUT.stat().st_size / (1024 * 1024)
    print("OK AI hero", OUT, f"({size_mb:.2f} MB)", flush=True)


if __name__ == "__main__":
    main()
