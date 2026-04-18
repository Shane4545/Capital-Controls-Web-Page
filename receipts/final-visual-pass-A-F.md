# Final visual correction — plans A–F (pre-implementation)

## A. KEEP (premium / acceptable in main path)

| Asset | Use |
|-------|-----|
| `scada-killaloe-overview.png` | Hero (sole system visual), Carleton project card, key page heroes where used |
| `scada-pembroke-mixer-pumps.png` | Project card (transit / process depth), supporting sections |
| `scada-pembroke-alarms.png` | ROPEC / alarm narrative, platforms body |
| `brand-hero.jpg` | Neutral premium fallback when no project-specific strong photo (e.g. one project card, optional strip) |
| `panel.jpg` | Engineering/drawing context only (thin strip), not as “featured panel photo” |
| Partner SVGs / logos | Unchanged |

## B. REPLACE (weak for role; swap asset or treatment)

| Current use | Action |
|-------------|--------|
| Hero floating `scada-pembroke-mixer-pumps.png` beside copy | **Replace treatment** — remove secondary hero frame; one strong Killaloe field + typographic column |
| Project card `hmi-chalk-river-trends.png` | **Replace** with `scada-pembroke-mixer-pumps.png` (stronger SCADA) |
| Project card `wtp-rockland-actiflo-panel.jpg` | **Replace** — reads as door/gray/doc photo; use `brand-hero.jpg` with caption “Representative visual · Ottawa-region capital delivery” OR second SCADA — use **`brand-hero.jpg`** for clean brand moment |
| `services.html` page-hero `panel-csa-shop-primary.jpg` | **Replace** hero background with `scada-killaloe-overview.png` (system-first); keep or trim body imagery |
| `markets.html` body `panel-csa-shop-primary.jpg` | **Replace** with `scada-pembroke-mixer-pumps.png` |
| `platforms.html` body `panel-csa-shop-primary.jpg` | **Replace** with `scada-pembroke-mixer-pumps.png` (fabrication story told in copy; visual = operator-grade SCADA) |

## C. REMOVE (from homepage / premium featured slots)

| Asset | From |
|-------|------|
| `wtp-rockland-actiflo-panel.jpg` | Homepage project cards (and similar premium grids) |
| `hmi-chalk-river-trends.png` | Homepage selected projects |
| Hero duplicate SCADA float | Homepage (entire `hero-elite-stage` block) |
| `panel-csa-shop-primary.jpg` | Homepage (not used on home after prior pass — verify none) |

## D. New hero plan

- **Single art direction:** Full-bleed `scada-killaloe-overview.png` only; `object-position` tuned for graphic density on the right.
- **Readability:** Left ~52% covered by layered gradient (`#020617` → transparent) plus bottom vignette; **solid-feeling** copy column (`rgba(2,8,20,0.78)` + stronger blur + 1px highlight border).
- **Hierarchy:** Larger eyebrow gap, display line-height tightened, lead `max-width` ~36ch; **premium CTA row** (primary pill + ghost with arrow).
- **No** “text directly on busy mid-tones” — copy sits in defined panel, image visible on the right as atmosphere.

## E. Motion / effects plan

- Confirm **no** `tech-strip` marquee (static chips only); add **one-shot** subtle chip fade-in (opacity/transform), not infinite motion.
- **Hero entrance:** Stagger copy only; no competing float animation.
- **Sections:** `cci-reveal` + **image child** clip reveal (`clip-path: inset(0 0 0 100%)` → inset 0) with reduced motion fallback.
- **Page transitions:** Slightly longer ease on `::view-transition-*` for smoother cross-fade.
- **Hover:** Cards — refined shadow curve; primary buttons — micro-lift + focus ring.

## F. Homepage composition plan

- **Projects:** `projects-grid--premium` — first card **spans 2 columns** on ≥1024px with **horizontal** media|content split for editorial weight; other cards standard.
- **Section intros:** Optional left **accent rule** + asymmetric `max-width` on deck.
- **Deliverables / industries:** Slight **staggered vertical rhythm** (nth-child top padding) on wide screens for less “grid of equals” feel.
- **Spacing:** Increase section padding on dark CTA; tighten competing headlines.

---

*Implementation follows this document.*
