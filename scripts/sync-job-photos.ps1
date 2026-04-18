# Re-sync web photos from H:\Jobs (requires Python + Pillow).
# Run:  powershell -File scripts\sync-job-photos.ps1
Set-Location (Split-Path $PSScriptRoot -Parent)
python scripts\sync_job_photos.py
