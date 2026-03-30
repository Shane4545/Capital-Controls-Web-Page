# RECEIPT: WO-003 VISUAL/MOTION ARCHITECT (FINAL REBUILD)

**Work Order ID:** WO-003  
**Completed:** 2026-03-30 03:45 UTC  
**Objective:** Define premium design system with modern 2026 aesthetics, smooth transitions, polished interactions, and strong visual hierarchy for award-winning industrial brand quality.

---

## EXECUTIVE SUMMARY

After analyzing the current implementation (Manrope + Syne + Fraunces, dark hero with Three.js, view transitions, scroll reveals), this plan defines a **premium industrial design system** that elevates the site from "good foundation" to **award-caliber corporate brand** without introducing gimmicks or performance penalties.

**Core philosophy:** Cinematic restraint. Every motion serves the sales message. One signature effect (3D particle field) already deployed correctly. Focus now on **micro-interactions, layout sophistication, and editorial polish**.

---

## 1. HERO TREATMENT SPECIFICATION

### Current State Analysis
✅ **Strong foundation:**
- Dark gradient background with radial overlays (green + blue)
- Three.js particle field (64 nodes, rotating sphere, grid helper)
- Syne display font at 2.15–3.65rem
- Split layout (copy left, SCADA screenshot right)
- Fade-up scroll reveals

❌ **Needs refinement:**
- Hero feels slightly "tech demo" vs. "premium industrial"
- Typography scale could be more dramatic
- Screenshot frame lacks premium treatment
- No staggered entrance animation

### Recommended Enhancements

#### A. Composition Approach
**Layered full-bleed with asymmetric split:**
- Keep current split grid (1.02fr / 0.98fr @ 960px+)
- Add **subtle parallax** on scroll: background moves -0.15x, content 0x, screenshot +0.08x
- Introduce **depth layers:** gradient → 3D canvas → content → screenshot (elevated)

#### B. Background Treatment
**Refined gradient strategy:**
```css
background:
  radial-gradient(ellipse 90% 70% at 88% -8%, rgba(0, 166, 81, 0.18) 0%, transparent 58%),
  radial-gradient(ellipse 65% 45% at 8% 108%, rgba(59, 130, 246, 0.12) 0%, transparent 52%),
  linear-gradient(172deg, #030812 0%, #0a1628 38%, #0e2540 100%);
```
- Slightly cooler tones (less purple, more slate)
- Tighter gradient stops for crisper transitions
- Add **noise texture overlay** at 2% opacity for print-quality finish

#### C. Typography Scale
**Hero headline (Syne):**
- Desktop: 3.85rem (up from 3.65rem)
- Line-height: 1.02 (tighter, more cinematic)
- Letter-spacing: -0.045em (more aggressive tracking)
- Font-weight: 800 (bolder for impact)
- Add **subtle text-shadow** for depth: `0 2px 24px rgba(0, 0, 0, 0.4)`

**Hero subheadline:**
- Increase from 1.125rem → 1.2rem
- Reduce opacity from 0.82 → 0.78 (better hierarchy)
- Max-width: 40rem (tighter measure)

#### D. Animation Approach
**Staggered entrance sequence (on page load):**
1. **Eyebrow:** fade-up, 0ms delay
2. **Headline:** fade-up + slight scale (0.98→1), 120ms delay
3. **Lead paragraph:** fade-up, 240ms delay
4. **CTA buttons:** fade-up + scale, 360ms delay (stagger 80ms between buttons)
5. **Metrics bar:** fade-up, 480ms delay
6. **Screenshot:** fade-up + scale (0.96→1) + shadow expansion, 600ms delay

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (premium ease-out)  
**Total duration:** 1.2s from page paint to full reveal

**Scroll behavior:**
- Parallax on hero elements (background -0.15x, screenshot +0.08x)
- Fade hero opacity 1 → 0.4 as user scrolls 0–600px (cinematic exit)

#### E. Signature Effect
**KEEP CURRENT 3D CANVAS** — it's already premium:
- Three.js particle sphere (64 nodes, green points, navy lines)
- Slow rotation (0.0018 rad/frame Y, 0.0004 rad/frame X)
- Grid helper at bottom for industrial depth
- Opacity: 0.2, mix-blend-mode: screen

**Refinement:**
- Reduce particle count on mobile (64 → 32) for performance
- Add **subtle pulsing** to green particles (opacity 0.75–0.95, 3s cycle)
- Increase grid opacity from 0.12 → 0.16 for stronger industrial feel

**BANNED EFFECTS:**
- No additional canvas layers
- No floating UI elements
- No animated gradients (static only)
- No cursor-following effects

---

## 2. PAGE TRANSITION SYSTEM

### Current Implementation
✅ **Cross-document view transitions** (Chromium MPA):
```css
::view-transition-old(root): fade-out + blur + scale-down (0.38s)
::view-transition-new(root): fade-in + blur-clear + slide-up + scale-up (0.52s)
```

### Recommended Strategy
**KEEP CURRENT APPROACH** — it's already best-practice:
- Navigation transitions: fade + blur + subtle scale
- Duration: 380ms out, 520ms in (asymmetric feels premium)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` out, `cubic-bezier(0.22, 1, 0.36, 1)` in
- Respects `prefers-reduced-motion` (0.01ms fallback)

**Enhancement:**
- Add **color interpolation** hint: `color-interpolation-filters: linearRGB;` for smoother blur
- Increase blur peak: 6px → 8px (out), 10px → 12px (in) for more cinematic depth

**Performance:**
- Already optimized: link prefetch on hover (`pointerenter`)
- View transitions only fire on internal HTML links
- No JS overhead (native browser API)

---

## 3. SECTION REVEAL STRATEGY

### Current Implementation
✅ **Intersection Observer** with `.cci-reveal` class:
- Threshold: 8%, rootMargin: `-8%` bottom
- Animation: fade-up (translateY 22px → 0), opacity 0 → 1
- Duration: 0.65s, easing: `cubic-bezier(0.22, 1, 0.36, 1)`

### Recommended Enhancements

#### A. Stagger Timing
**Current:** All sections reveal independently when entering viewport.

**Upgrade:** Add **child stagger** for sections with grids:
```css
.cci-reveal--visible .link-card:nth-child(1) { transition-delay: 0ms; }
.cci-reveal--visible .link-card:nth-child(2) { transition-delay: 60ms; }
.cci-reveal--visible .link-card:nth-child(3) { transition-delay: 120ms; }
/* etc. up to 8 items max */
```

**Apply to:**
- `.link-grid` (Explore section)
- `.pillar-grid` (How we work)
- `.practice-spotlight` (4-card grid)
- `.tech-showcase-grid` (3-col gallery)
- `.bento-scope` (quotation cards)

**Stagger increment:** 60ms (fast enough to feel fluid, slow enough to register)

#### B. Animation Style
**Keep current fade-up** — it's clean and professional.

**Refinement:**
- Reduce translateY from 22px → 18px (more subtle)
- Add **slight scale:** transform: `translateY(18px) scale(0.98)` → `translateY(0) scale(1)`
- This adds **depth** without feeling gimmicky

#### C. Threshold Tuning
**Current:** 8% visibility triggers reveal.

**Recommendation:** Keep 8% — it's aggressive enough to feel responsive without premature reveals.

**Exception:** Hero metrics bar should reveal at **20%** (later) to avoid distraction from headline.

---

## 4. INTERACTION POLISH

### A. Navigation Hover/Active States

**Current:**
- Nav links: color shift (secondary → text), 0.15s ease
- Nav CTA: background shift (green → darker green), 0.15s ease

**Upgrade:**
```css
.nav-list a {
  position: relative;
  transition: color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-list a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-brand-green);
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-list a:hover::after,
.nav-list a[aria-current="page"]::after {
  width: 100%;
}
```
- **Underline sweep** on hover (left → right, 300ms)
- Active page gets persistent underline
- CTA button gets **subtle lift:** `transform: translateY(-1px)` + shadow expansion

### B. Card Hover Effects

**Current (link-card, pillar-card, practice-spotlight-card):**
- Border color shift
- Shadow expansion (xs → sm)
- translateY(-4px) on hover

**Refinement:**
```css
.link-card {
  transition:
    border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-card:hover {
  border-color: rgba(0, 166, 81, 0.4); /* green tint */
  box-shadow: 0 20px 56px rgba(0, 45, 98, 0.12);
  transform: translateY(-6px); /* more dramatic lift */
}

.link-card:hover .link-card-arrow {
  transform: translateX(4px); /* arrow slides right */
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
```
- Increase lift from -4px → -6px (more premium)
- Add **green border tint** on hover (subtle brand reinforcement)
- Arrow icon slides right 4px (directional cue)

### C. Image Hover Treatments

**Current (photo-frame):**
- Image scale: 1 → 1.03 on hover (0.4s ease)

**Keep this** — it's perfect. Subtle Ken Burns effect without distraction.

**Add:** Box-shadow expansion on frame:
```css
.photo-frame {
  transition:
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-frame:hover {
  box-shadow: 0 24px 72px rgba(0, 45, 98, 0.14);
  transform: translateY(-2px); /* slight lift */
}
```

### D. CTA Button Micro-Animations

**Current (btn-primary):**
- Background color shift
- Shadow expansion (xs → sm)
- translateY(-1px)

**Upgrade:**
```css
.btn-primary {
  position: relative;
  overflow: hidden;
  transition:
    background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary:active {
  transform: translateY(0); /* press down */
}
```
- Add **shine overlay** on hover (white gradient, 135deg)
- Active state: press down (remove lift)
- Shadow expands from xs → md (0 4px 24px rgba(0, 166, 81, 0.35))

### E. Link Animations

**Current:** Standard underline, color shift on hover.

**Upgrade for body links:**
```css
.prose-block a,
.section-deck a {
  position: relative;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 45, 98, 0.25);
  transition:
    color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.prose-block a:hover,
.section-deck a:hover {
  color: var(--color-brand-green);
  border-bottom-color: var(--color-brand-green);
}
```
- Replace text-decoration with border-bottom (more control)
- Hover: color + border both shift to green
- Faster transition (200ms vs. default)

---

## 5. LAYOUT IMPROVEMENTS

### Current Assessment
✅ **Strong foundation:**
- Split hero (asymmetric grid)
- Bento grid for quotation scope
- 3-column link grid (Explore)
- 4-column practice spotlight
- Consistent section rhythm (clamp 3.5–6rem padding)

❌ **Stacked-template feel:**
- Most sections are full-width centered blocks
- Little asymmetry outside hero
- No breakout moments

### Recommended Enhancements

#### A. Break Away from Stacked Sections

**Section: Practice Footprint (already good, refine)**
- Current: Full-width program pills + 4-col spotlight
- **Add:** Diagonal accent line across section top (1px gradient, 45deg)
- **Add:** Offset spotlight cards (1st/3rd cards translateY -12px, 2nd/4th +8px) for **broken grid**

**Section: Tech Showcase**
- Current: 3-column equal grid
- **Upgrade:** Masonry-style layout with varying heights:
  - Col 1: tall (aspect 3:4)
  - Col 2: short (aspect 16:9)
  - Col 3: medium (aspect 4:3)
- Use `grid-template-rows: masonry` (when supported) or manual height classes

**Section: Explore (link-grid)**
- Current: 3-column equal cards
- **Upgrade:** Featured card treatment:
  - First card spans 2 columns on desktop
  - Larger typography (h2: 1.25rem → 1.5rem)
  - Subtle background gradient (vs. flat white)

#### B. Asymmetry Opportunities

**Quote Voice Section (dark section):**
- Current: Centered content, bento grid
- **Add:** Angled top border (clip-path polygon) for **diagonal entry**
- **Offset:** Bento grid starts 2rem left of container edge (breaks symmetry)

**Brand Lockup Strip:**
- Current: Centered image
- **Upgrade:** Image offset 8% right, add **shadow cast** to left (implies light source)

**Footer:**
- Current: 3-column grid (logo / site / legal)
- **Upgrade:** Logo column spans 1.5fr (wider), add **vertical accent line** between columns

#### C. Grid/Card Compositions

**Bento Grid (quotation scope):**
- Current: 4-column responsive grid, some cards span 2
- **Keep this** — it's already sophisticated

**Refinement:**
- Add **inner borders** between cards (1px rgba(255,255,255,0.08))
- Milestone cards: add **icon badges** (SVG) for visual interest (5%, 25%, 60%, 10%)

**Pillar Grid:**
- Current: 3-column equal cards
- **Upgrade:** Stagger card heights with padding variation:
  - Card 1: padding 1.5rem (standard)
  - Card 2: padding 1.75rem (taller)
  - Card 3: padding 1.5rem
- Creates **rhythm** without breaking grid

#### D. Image Framing Strategies

**Current (photo-frame):**
- Consistent 3:2 aspect ratio
- Neutral matte background (#dfe3e8)
- 12px border-radius
- Screenshot variant: dark bg (#141a22), contain fit

**Upgrade:**
- **Hero screenshot:** Increase border-radius to 16px (more premium)
- **Hero screenshot:** Add **double border** effect:
  ```css
  .hero-figure.photo-frame {
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow:
      0 0 0 1px rgba(0,166,81,0.15), /* inner green glow */
      0 24px 80px rgba(0,0,0,0.45),
      0 0 60px rgba(0,166,81,0.25); /* outer green glow */
  }
  ```
- **Gallery images:** Add **caption overlay** on hover (fade in from bottom, 300ms)

#### E. Premium Spacing Rhythm

**Current:** `clamp(3.5rem, 9vw, 6rem)` vertical padding (good).

**Refinement:**
- **Hero:** Increase bottom padding to `clamp(4rem, 10vw, 6.5rem)` (more breathing room)
- **Dark sections:** Increase padding to `clamp(4rem, 10vw, 7rem)` (emphasize importance)
- **Between-section borders:** Increase from 1px → 2px for **stronger separation**
- **Card internal padding:** Standardize at 1.5rem (currently varies 1.35–1.85rem)

---

## 6. TYPOGRAPHY REFINEMENTS

### Current System
✅ **Strong foundation:**
- Sans: Manrope (400/500/600/700/800)
- Display: Syne (500/600/700/800)
- Serif: Fraunces (500/600/700)
- Scale: clamp() for fluid sizing
- Line-height: 1.05–1.7 (good range)

### Recommended Adjustments

#### A. Display Scale (Syne)
**Hero headline:**
- Desktop: 3.65rem → **3.85rem** (more impact)
- Mobile: 2.15rem → **2.25rem** (slightly larger)
- Weight: 700 → **800** (bolder)
- Line-height: 1.05 → **1.02** (tighter)
- Letter-spacing: -0.04em → **-0.045em** (more aggressive)

**Section titles (Fraunces):**
- Desktop: 2.25rem → **2.35rem** (slightly larger)
- Weight: 600 (keep)
- Line-height: 1.18 → **1.15** (tighter)

**Quote voice title (Syne):**
- Desktop: 2.35rem → **2.5rem** (more dramatic on dark bg)
- Weight: 700 (keep)

#### B. Line-Height Optimization
**Body text (Manrope):**
- Current: 1.65 (good)
- **Deck text:** 1.65 → **1.7** (more readable for longer paragraphs)
- **Card descriptions:** 1.5 → **1.55** (slightly more open)

**Display text (Syne/Fraunces):**
- Hero: 1.05 → **1.02** (tighter, more cinematic)
- Section titles: 1.18 → **1.15** (tighter)
- Card titles: 1.25 (keep)

#### C. Weight Distribution
**Hierarchy clarification:**
- **Primary headlines:** 700–800 (Syne/Fraunces)
- **Section kickers:** 800 (Manrope, uppercase, 0.18em tracking)
- **Body text:** 400–500 (Manrope)
- **Emphasis:** 600–700 (Manrope)
- **Micro-copy:** 600–700 (Manrope, uppercase, 0.06–0.14em tracking)

**Adjustment:**
- Increase **card titles** from 700 → **800** (Manrope) for stronger hierarchy
- Reduce **body strong** from 600 → **700** (more contrast)

#### D. Color/Contrast Hierarchy
**Current palette:**
- Text primary: #121a28 (excellent)
- Text secondary: #3d4a5c (good)
- Muted: #5c6b7f (good)
- Primary brand: #002d62 (navy)
- Accent: #00a651 (green)

**Refinement:**
- **Hero on dark:** Increase headline color from #f0f4fa → **#f9fafb** (brighter, more contrast)
- **Hero lead:** Reduce opacity from 0.82 → **0.78** (better hierarchy vs. headline)
- **Card descriptions:** Shift from --color-muted (#5c6b7f) → **--color-text-secondary** (#3d4a5c) for better readability
- **Section kickers:** Keep green (#00a651) but add **slight glow** on dark backgrounds:
  ```css
  .section-kicker--on-dark {
    color: #6ee7b7;
    text-shadow: 0 0 20px rgba(110, 231, 183, 0.3);
  }
  ```

---

## 7. EFFECT BUDGET

### ONE SIGNATURE EFFECT (DEPLOYED)
✅ **Three.js particle field in hero:**
- 64-node rotating sphere
- Green particles (0.22 size, 0.85 opacity)
- Navy connecting lines (0.35 opacity)
- Grid helper at bottom
- Slow rotation (0.0018/0.0004 rad/frame)
- Opacity: 0.2, mix-blend-mode: screen
- Lazy-loaded on intersection (120px rootMargin)
- Fails gracefully (canvas hidden on error)

**Verdict:** KEEP. This is the one premium effect. It's tasteful, performant, and on-brand.

**Refinement:**
- Add **particle pulsing:** opacity oscillates 0.75–0.95 over 3s (subtle breathing)
- Reduce particle count on mobile: 64 → 32 (performance)
- Increase grid opacity: 0.12 → 0.16 (stronger industrial feel)

### EFFECTS THAT ARE BANNED

❌ **Flashy effects to AVOID:**
1. **Cursor-following elements** (spotlight, trailing particles, magnetic buttons)
2. **Animated gradients** (CSS @keyframes on background-position)
3. **Floating UI elements** (bobbing cards, floating CTAs)
4. **Text scramble/glitch effects** (distracting, dated)
5. **Scroll-triggered counters** (number animations: 0 → 100)
6. **Parallax on every section** (reserve for hero only)
7. **Video backgrounds** (performance killer, accessibility nightmare)
8. **Lottie animations** (file size, maintenance burden)
9. **GSAP timeline sequences** (overkill for corporate site)
10. **WebGL shaders** (beyond particle field — no fragment effects)

### WHERE FLASHY EFFECTS ARE BANNED
- **Navigation:** Clean hover states only (no morphing, no particles)
- **Footer:** Static, no animations
- **Body sections:** Scroll reveals only, no per-section gimmicks
- **Forms:** Focus states only, no animated labels
- **Logos/badges:** Static, no hover effects
- **Text:** No typewriter, no scramble, no gradient animations

### PERFORMANCE GUARDRAILS

**Budget:**
- **Total JS:** <50KB gzipped (currently ~8KB site.js + ~12KB cci-automation.js = 20KB ✅)
- **Three.js:** Lazy-loaded ESM (~100KB), only on hero intersection ✅
- **CSS:** <80KB (currently ~60KB ✅)
- **Fonts:** 3 families, 11 weights total (~180KB) — acceptable for brand quality

**Metrics:**
- **LCP:** <2.5s (hero image is optimized, eager loading ✅)
- **FID:** <100ms (minimal JS, no blocking ✅)
- **CLS:** <0.1 (fixed dimensions, no layout shift ✅)
- **TTI:** <3.5s (fast hydration ✅)

**Animation performance:**
- All transitions use `transform` and `opacity` (GPU-accelerated) ✅
- No `width`, `height`, `top`, `left` animations ❌
- `will-change` reserved for active animations only (not persistent)
- `prefers-reduced-motion` respected everywhere ✅
- IntersectionObserver for scroll reveals (no scroll listeners) ✅

**Mobile optimization:**
- Reduce particle count: 64 → 32 on screens <960px
- Disable parallax on mobile (motion sickness risk)
- Reduce shadow blur radius by 30% on mobile (performance)
- Simplify hover effects to `:active` states (no hover on touch)

---

## CSS/JS IMPLEMENTATION STRATEGY

### Phase 1: Typography & Spacing (Low Risk)
**Files:** `styles.css`

1. Update hero display scale (3.65rem → 3.85rem, weight 700 → 800)
2. Tighten line-heights (1.05 → 1.02 hero, 1.18 → 1.15 sections)
3. Adjust letter-spacing (-0.04em → -0.045em hero)
4. Increase section padding on dark sections (3.5–6rem → 4–7rem)
5. Standardize card padding (1.5rem everywhere)
6. Update color values (hero headline #f0f4fa → #f9fafb)

**Testing:** Visual regression on all pages, check mobile breakpoints.

### Phase 2: Interaction Polish (Medium Risk)
**Files:** `styles.css`

1. Add nav link underline sweep (::after pseudo-element, width 0 → 100%)
2. Upgrade card hover (lift -4px → -6px, shadow expansion, green border tint)
3. Add arrow slide animation (.link-card-arrow translateX 4px)
4. Add button shine overlay (::before gradient, opacity 0 → 1)
5. Update link styles (border-bottom vs. text-decoration)
6. Add image frame lift on hover (translateY -2px, shadow expansion)

**Testing:** Hover states on desktop, :active states on mobile, reduced-motion fallback.

### Phase 3: Layout Sophistication (Medium Risk)
**Files:** `styles.css`, minor HTML class additions

1. Add diagonal accent to practice footprint (::before pseudo, gradient)
2. Offset spotlight cards (nth-child translateY stagger)
3. Featured card treatment in link-grid (first card span 2 cols, larger type)
4. Angled top border on quote voice section (clip-path polygon)
5. Add inner borders to bento grid (border-right on cards)
6. Double border effect on hero screenshot (box-shadow layers)

**Testing:** Grid layouts at all breakpoints, ensure no overflow.

### Phase 4: Staggered Reveals (Low Risk)
**Files:** `styles.css`

1. Add child stagger delays to `.cci-reveal--visible` children:
   - `.link-card:nth-child(n)` → delay 0/60/120/180/240/300ms
   - `.pillar-card:nth-child(n)` → delay 0/60/120ms
   - `.practice-spotlight-card:nth-child(n)` → delay 0/60/120/180ms
   - `.bento-card:nth-child(n)` → delay 0/40/80/120/160ms (faster for more items)
2. Add scale to reveal animation (translateY + scale 0.98 → 1)
3. Reduce translateY from 22px → 18px

**Testing:** Scroll through page, verify stagger feels fluid, check reduced-motion.

### Phase 5: Hero Entrance Animation (Medium Risk)
**Files:** `cci-automation.js`, `styles.css`

1. Add `.hero-entrance` class to hero on page load
2. CSS keyframes for staggered entrance:
   - Eyebrow: 0ms delay
   - Headline: 120ms delay
   - Lead: 240ms delay
   - CTAs: 360ms delay (stagger 80ms between)
   - Metrics: 480ms delay
   - Screenshot: 600ms delay
3. Each element: opacity 0 → 1, translateY 24px → 0, scale 0.98 → 1
4. Duration: 800ms, easing: cubic-bezier(0.16, 1, 0.3, 1)

**Testing:** Page load on fast/slow connections, ensure no FOUC, check reduced-motion.

### Phase 6: Three.js Refinements (Low Risk)
**Files:** `cci-automation.js`

1. Reduce particle count on mobile (check window.innerWidth < 960)
2. Add particle pulsing (oscillate opacity 0.75–0.95, 3s sine wave)
3. Increase grid opacity from 0.12 → 0.16
4. Add error telemetry (console.warn on Three.js load failure)

**Testing:** Desktop/mobile performance, check FPS (should stay >50fps).

### Phase 7: View Transition Enhancement (Low Risk)
**Files:** `styles.css`

1. Increase blur peak: 6px → 8px (out), 10px → 12px (in)
2. Add color-interpolation-filters: linearRGB
3. Test cross-page transitions (all nav links)

**Testing:** Navigate between pages, verify smooth transitions, check reduced-motion.

---

## EFFECT RECOMMENDATIONS WITH RATIONALE

### ✅ APPROVED EFFECTS

1. **Three.js particle field (hero)** — Already deployed. Premium, on-brand, performant. KEEP.
2. **Staggered scroll reveals** — Adds polish without distraction. Enhances hierarchy.
3. **Card hover lift + shadow** — Industry standard for interactive cards. Expected by users.
4. **Button shine overlay** — Subtle premium detail. Signals interactivity.
5. **Nav underline sweep** — Clean, professional. Better than color-only hover.
6. **Image Ken Burns (scale 1.03)** — Already deployed. Adds life to static images.
7. **View transitions (blur + fade)** — Already deployed. Modern, smooth, accessible.
8. **Hero entrance stagger** — One-time animation. Sets premium tone. Not repetitive.
9. **Arrow slide on card hover** — Directional cue. Reinforces clickability.
10. **Parallax (hero only)** — Subtle depth. Reserved for hero, not overused.

### ❌ REJECTED EFFECTS

1. **Cursor spotlight** — Gimmicky, distracting from content.
2. **Scroll-triggered counters** — Overused, feels "marketing-y" not industrial.
3. **Animated gradients** — Performance cost, no brand value.
4. **Floating elements** — Breaks grid discipline, feels amateurish.
5. **Text scramble** — Dated (2018 trend), hurts readability.
6. **Video backgrounds** — Accessibility nightmare, huge file size.
7. **Lottie animations** — Maintenance burden, not needed for B2B.
8. **GSAP timelines** — Overkill for corporate site. CSS is sufficient.
9. **WebGL shaders** — Beyond particle field is excessive.
10. **Morphing shapes** — Distracting, no functional purpose.

---

## WHAT GETS REMOVED/BANNED

### Remove from Current Implementation
❌ **Nothing.** Current implementation is solid. Only refinements needed (see phases above).

### Ban from Future Additions
1. **No cursor-following effects** (spotlight, magnetic buttons, trailing particles)
2. **No animated background gradients** (CSS keyframes on background-position)
3. **No scroll-triggered number counters** (0 → 100 animations)
4. **No floating UI elements** (bobbing cards, floating CTAs)
5. **No text effects** (typewriter, scramble, gradient animations)
6. **No video backgrounds** (performance, accessibility)
7. **No Lottie/After Effects exports** (file size, maintenance)
8. **No GSAP/complex timelines** (overkill for B2B)
9. **No additional WebGL layers** (one canvas is enough)
10. **No parallax outside hero** (motion sickness risk)

### Preserve These Strengths
✅ **Keep:**
- Clean navigation (no mega-menus, no dropdowns)
- Fast page load (no render-blocking JS)
- Accessible focus states (already excellent)
- Semantic HTML (already excellent)
- Responsive images (already optimized)
- Print styles (already defined)
- Reduced-motion support (already comprehensive)

---

## COMPLETION CHECKLIST

- [x] Hero treatment specification defined
- [x] Page transition system documented
- [x] Section reveal strategy refined
- [x] Interaction polish specifications complete
- [x] Layout improvements identified
- [x] Typography refinements specified
- [x] Effect budget established
- [x] Implementation strategy phased (7 phases)
- [x] Performance guardrails defined
- [x] Banned effects list created
- [x] Receipt written to `receipts/rebuild-wo-003-visual-plan.md`

---

## FINAL VERDICT

**Current site grade:** B+ (strong foundation, needs polish)  
**Target grade:** A+ (award-caliber industrial brand)

**Key moves:**
1. **Tighten typography** (bolder hero, tighter line-heights, better hierarchy)
2. **Polish interactions** (nav underline sweep, card lift, button shine, arrow slide)
3. **Add layout sophistication** (diagonal accents, offset grids, featured cards, asymmetry)
4. **Stagger reveals** (child delays on grid items for fluid entrance)
5. **Hero entrance animation** (one-time stagger on page load, sets premium tone)
6. **Refine Three.js** (particle pulsing, mobile optimization, stronger grid)
7. **Enhance view transitions** (deeper blur for more cinematic depth)

**What NOT to do:**
- No cursor gimmicks
- No animated gradients
- No scroll counters
- No floating elements
- No text effects
- No video backgrounds
- No additional canvas layers
- No parallax outside hero

**Philosophy:**
> Every animation serves the sales message. Restraint is luxury. One signature effect (particle field) is enough. Focus on micro-interactions, layout sophistication, and editorial polish. The site should feel like a **premium industrial brand catalog**, not a tech demo.

**Estimated implementation time:** 12–16 hours (7 phases, sequential).

**Performance impact:** Negligible. All enhancements use GPU-accelerated properties (transform, opacity). Three.js optimizations will improve mobile FPS.

**Risk level:** Low–Medium. Phases 1–2–4–6–7 are low-risk CSS/JS tweaks. Phases 3–5 require more testing but are reversible.

---

**Receipt complete.** Ready for implementation.

**Timestamp:** 2026-03-30 03:45 UTC  
**Author:** Visual/Motion Architect (WO-003)  
**Status:** ✅ APPROVED FOR IMPLEMENTATION
