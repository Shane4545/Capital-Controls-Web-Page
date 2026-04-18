# Capital Controls — website

Static site for **Capital Controls & Instrumentation Inc.**

- **Repository:** [github.com/Shane4545/Capital-Controls-Web-Page](https://github.com/Shane4545/Capital-Controls-Web-Page)
- **Live site:** `https://shane4545.github.io/Capital-Controls-Web-Page/` — if GitHub Pages is off, either set **Settings → Pages → Deploy from branch → `main` → `/ (root)`**, or run the **Configure GitHub Pages source** workflow once (**Actions → that workflow → Run workflow**).

## Local preview

```bash
python -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

Large internal corpus files under `assets/` are gitignored; regenerate locally with `scripts/extract_sales_corpus.py` if needed.
