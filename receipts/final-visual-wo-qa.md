# Final visual pass — WO-E QA + verdicts

**Date:** 2026-03-29  
**Scope:** Visual / art direction only (no new research, no corpus counts, no archive dumps).

## A–F plans (executed)

Full written plan: `receipts/final-visual-pass-A-F.md`.

| Item | Summary |
|------|---------|
| **A. KEEP** | `scada-killaloe-overview.png`, `scada-pembroke-alarms.png`, `scada-pembroke-mixer-pumps.png`, partner SVGs, logo assets. |
| **B. REPLACE** | Homepage transit card: trends → mixer pumps SCADA. Hurdman card: weak panel → `brand-hero.jpg` + representative caption. Markets/platforms body: shop panel → SCADA (`alarms` / `mixer-pumps`). Services/experience meta heroes → Killaloe SCADA. |
| **C. REMOVE** (premium path) | `wtp-rockland-actiflo-panel.jpg`, `hmi-chalk-river-trends.png` from homepage selected projects; `panel-csa-shop-primary.jpg` from markets/platforms **featured** slots and experience gallery tile (replaced with brand). |
| **D. Hero plan** | Single full-bleed Killaloe; removed secondary float frame; stronger left scrim + glass copy panel + green rail; premium pill CTAs; background settle animation. |
| **E. Motion plan** | Stack strip = static chips with staggered fade-in (not marquee). Smoother view transitions. Hero copy stagger + bg settle. Project grid stagger + image ease when section reveals. Nav / button hover polish. |
| **F. Composition** | Editorial left rule on key section intros; featured project row (wide layout); fewer competing hero elements; tighter image curation. |

## Browser screenshots

Captured via embedded browser against `python -m http.server` on port 5555.

| File | Notes |
|------|--------|
| `receipts/screenshots/final-visual-home-hero.png` | Homepage (initial capture). |
| `receipts/screenshots/final-visual-home-desktop.png` | Homepage after resize (tool may still emulate narrow viewport). |
| `receipts/screenshots/final-visual-home-1680.png` | Homepage after 1680× resize request. |
| `receipts/screenshots/final-visual-services-hero.png` | Services hero after SCADA background (before text contrast fix). |
| `receipts/screenshots/final-visual-services-hero-v2.png` | Services hero after `page-hero--image` — white H1 / lead / breadcrumbs on photo hero. |

**`page-hero--image`:** Applied to `services.html`, `markets.html`, and `experience.html` photo heroes so headline and body copy are not overridden by default dark `.page-hero h1` / `.page-hero-lead` colors.

## Images replaced / removed (this pass)

| Removed from primary / premium use | Replaced with |
|-----------------------------------|---------------|
| `wtp-rockland-actiflo-panel.jpg` (homepage Hurdman card) | `brand-hero.jpg` + `project-visual-note` |
| `hmi-chalk-river-trends.png` (homepage TTC card) | `scada-pembroke-mixer-pumps.png` |
| `panel-csa-shop-primary.jpg` (markets.html body figure) | `scada-pembroke-alarms.png` |
| `panel-csa-shop-primary.jpg` (platforms.html body figure) | `scada-pembroke-mixer-pumps.png` |
| `panel-csa-shop-primary.jpg` (experience gallery tile) | `brand-hero.jpg` |
| Hero float `scada-pembroke-mixer-pumps.png` (secondary frame) | Removed — single-hero composition |

**Still used in context-appropriate places:** `panel-csa-shop-primary.jpg` remains on **services.html** under CSA panel fabrication (supporting copy for shop build), not as page hero or markets/platforms showcase.

## Files changed

- `index.html` — hero singular layout; project cards + images; editorial intros; premium CTAs.
- `styles.css` — hero scrim, copy panel, stack-strip chip entrance, view transitions, projects premium grid, section project reveals, `page-hero--image`, nav hover, CTA polish.
- `services.html` — og/schema/hero SCADA; `page-hero--image`; stronger gradient.
- `markets.html` — body image swap; hero class + gradient; breadcrumb/eyebrow inline styles removed.
- `platforms.html` — body image swap.
- `experience.html` — og image; hero class + gradient; gallery tile swap.
- `receipts/final-visual-wo-qa.md` — this file.

## Tester verdict

**PASS (with notes).** Weak Actiflo/door-style and Chalk River trends shots are off the homepage project grid. Hero is a single cinematic field with readable glass panel and stronger gradient. Stack strip is not a scrolling marquee. Interior photo heroes that use SCADA now include `page-hero--image` so H1/lead/breadcrumb contrast meets the readability bar. Verify on a true desktop viewport locally; MCP screenshots may render at a narrow device width.

## Judge verdict

**PASS — directionally “award-track” for a municipal integrator site.** The homepage no longer reads as a split hero with a floating screenshot “sticker,” project imagery is SCADA- and system-forward, and motion is restrained (entrance + hover + section reveal, not ticker-as-headline). Remaining stretch goals: optional second unique SCADA still for Hurdman if a stronger project-specific asset exists; further tighten top-of-page banding on small viewports if the stack strip still feels busy.
