# Capital Controls — website

Static site for **Capital Controls & Instrumentation Inc.**

- **Repository:** [github.com/Shane4545/Capital-Controls-Web-Page](https://github.com/Shane4545/Capital-Controls-Web-Page)
- **Live site:** `https://shane4545.github.io/Capital-Controls-Web-Page/`
- **First-time GitHub Pages (required):** In the repo, open **Settings → [Pages](https://github.com/Shane4545/Capital-Controls-Web-Page/settings/pages)**. Under *Build and deployment*, set **Source** to **Deploy from a branch**, then **Branch** = `main`, **Folder** = `/ (root)`, and **Save**. GitHub’s default `GITHUB_TOKEN` in Actions is **not allowed** to turn Pages on or change that source via the API (you get 403 *Resource not accessible by integration*), so this one-time click in the UI is the reliable path.

## Local preview

```bash
python -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

Large internal corpus files under `assets/` are gitignored; regenerate locally with `scripts/extract_sales_corpus.py` if needed.
