# Elite visual pass — plans A–E (2026-03-30)

## A. Homepage sections to remove (exact)

| Item | Current state | Action |
|------|---------------|--------|
| Scrolling tech ticker | `.tech-strip.tech-strip--live` with `cci-strip-marquee` | **Remove** — replace with static `.stack-strip` |
| Three.js canvas in hero | `#cci-3d-canvas` | **Remove from homepage** — signature effect = layered photo hero + grain only |
| Standalone credentials strip | `.credibility-strip` between Industries and Platforms | **Remove** — credentials merged into static stack strip |
| (Legacy) Quote voice / bento / milestones / media index | Not present in current `index.html` | **N/A** — verify none reappear |

## B. New homepage structure (exact order)

1. **Topbar** (unchanged, one line credibility)
2. **Header + nav** — label **Industries** → `markets.html`
3. **Stack strip** — static platform/credential chips (no animation)
4. **Hero (elite)** — full-bleed Killaloe SCADA + layered gradient + frosted copy column + floating secondary visual (Pembroke mixer)
5. **What we deliver** — 8 deliverables in a **defined CSS grid** (cards)
6. **Industries / applications** — 6 industry cards (grid)
7. **Platforms** — platform cards + partner logos
8. **Selected projects** — **4 cards, 4 unique images** (Killaloe, Pembroke alarms, Chalk River trends, Actiflo panel — Rockland main PLC available for deep pages)
9. **Delivery process** — timeline (copy: step 01 without “quotation” lead)
10. **CTA** — procurement language without “quotation” in body where possible
11. **Footer**

## C. Premium motion plan (exact)

| Layer | Implementation |
|-------|------------------|
| Page transitions | Keep `document.startViewTransition` + existing `::view-transition-*` (blur/scale) |
| Section reveals | Keep `.cci-reveal` IntersectionObserver; add stagger for `.deliverable-card`, `.project-card` via CSS `transition-delay` |
| Hero | One-time entrance on `.hero--elite` (rename from `.hero--automation` for homepage): stagger copy block + float figure |
| Hover | Cards: lift + border tint; project images: scale 1.04 inside overflow hidden; nav underline (existing) |
| **Removed** | `cci-strip-marquee` animation; no infinite horizontal scroll as primary motion |
| **Signature** | (1) Layered cinematic hero + subtle CSS grain. (2) View transitions. Optional: very subtle `prefers-reduced-motion` fallbacks |

## D. Hero redesign plan (exact)

- **Background:** `scada-killaloe-overview.png` as `object-fit: cover` full-bleed behind content (`min-height: clamp(520px, 88vh, 920px)`).
- **Readability:** Multi-stop overlay — left/navy `rgba(2,12,28,0.92) → transparent` at ~55%, bottom vignette, top soft darken.
- **Copy column:** Frosted panel (`backdrop-filter`, border, shadow) max-width ~34rem; headline Syne 800, lead high-contrast `#e2e8f0`.
- **Secondary visual:** Right column floating `figure.hero-elite-float` with `scada-pembroke-mixer-pumps.png`, rotation -2deg, deep shadow — **not** a plain side-by-side split.
- **No canvas** on homepage hero.

## E. Homepage images — kept vs removed

| Asset | Role on homepage |
|-------|------------------|
| `scada-killaloe-overview.png` | **Keep** — hero background |
| `scada-pembroke-mixer-pumps.png` | **Keep** — hero float / proof |
| `scada-pembroke-alarms.png` | **Keep** — ROPEC project card |
| `hmi-chalk-river-trends.png` | **Keep** — TTC / transit project card (trend narrative) |
| `wtp-rockland-actiflo-panel.jpg` | **Keep** — Hurdman / municipal infrastructure card |
| `panel-csa-shop-primary.jpg` | **Remove from homepage** main flow (still used on Services/Experience/Markets) |
| `wtp-rockland-main-plc.jpg` | **Not on homepage** — reserve for Experience/inner pages if needed |
| All other photos | **Not on homepage** |

---

*Implementation follows this document.*
