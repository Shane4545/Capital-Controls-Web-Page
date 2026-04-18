# Elite visual pass v2 — implementation receipt

**Date:** 2026-03-30  
**Governance:** Visual/motion architect + homepage + curation + polish (coordinator execution)

## A–E reference

See `receipts/elite-v2-plan-A-E.md` for the pre-implementation plan (sections removed, structure, motion, hero, images).

## Files changed

| File | Change summary |
|------|----------------|
| `index.html` | Removed marquee `tech-strip--live`; added static `stack-strip`; cinematic `hero--elite` (full-bleed Killaloe + frosted copy + floating Pembroke); removed `credibility-strip`; unique project images; copy without “quotation” leads; nav/footer **Industries** |
| `styles.css` | `stack-strip`, `hero--elite` (layers, grain, float), homepage grids (`deliverables-grid`, `industries-grid`, `platforms-grid`, `projects-grid`, `process-timeline`), CTA section base styles, `scope-boundaries`, `partner-strip-compact` |
| `cci-automation.js` | `initHeroEntrance` targets `.hero--elite` or `.hero--automation` (no canvas on home) |
| `markets.html` | Titles/nav **Industries**; removed 92%/corpus phrasing from hero and body |
| `platforms.html` | Removed public “95%” claims; softened dominance language |
| `experience.html` | Topbar; removed file-count/archive framing; portfolio paragraph without “180+” |
| `services.html` | Exclusions moved to `<details class="scope-boundaries">` |
| All `*.html` (batch) | Footer/header `Markets` → `Industries` where applicable |

## Homepage images (final)

- Hero background: `scada-killaloe-overview.png`  
- Hero float: `scada-pembroke-mixer-pumps.png`  
- Projects: Killaloe, `scada-pembroke-alarms.png`, `hmi-chalk-river-trends.png`, `wtp-rockland-actiflo-panel.jpg`

## Removed from homepage flow

- Infinite horizontal tech ticker  
- Three.js canvas on hero  
- Standalone credibility strip (merged into stack chips)

## Status

Implementation complete pending QA screenshots.
