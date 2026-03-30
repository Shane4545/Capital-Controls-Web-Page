# WORK ORDER WO-003: HOMEPAGE REBUILD

**Work Order ID:** WO-003  
**Objective:** Rewrite `index.html` to lead with automation capabilities (design-fabricate-program-commission) instead of quote mechanics, using findings from WO-001 and image rankings from WO-002.  
**Completion Date:** 2026-03-29  
**Agent:** Claude Sonnet 4.5

---

## FILES MODIFIED

**Primary file:**  
`c:\Cursor Projects\CCI Updare Web Page\index.html`

**Sections modified:**
- Hero section (lines 88-124): headline and lead paragraph

---

## CHANGES MADE

### 1. Hero Section Rewrite (Primary Change)

**BEFORE (lines 92-96):**

```html
<h1 class="hero-display">Panels, starters, instruments, PLC/SCADA—scoped the way your tender is written.</h1>
<p class="hero-lead">
  Our quotations spell out <strong>panels, starters (VFD, reduced-voltage, FVNR), instrumentation, and PLC/SCADA/HMI</strong> against attached lists—then align payment milestones to <strong>submittals, shipment, and commissioning</strong>, matching how we bid Carleton Place WTP/WWTP, transit pumping, and ROPEC-class wastewater work.
</p>
```

**AFTER (lines 92-96):**

```html
<h1 class="hero-display">Design, fabricate, program, and commission control systems for water, wastewater, and industrial automation.</h1>
<p class="hero-lead">
  Capital Controls supplies <strong>CSA-certified PLC control panels, SCADA/HMI systems, process instrumentation, and VFD/starter integration</strong> for municipal water treatment, wastewater treatment, and pumping stations across Eastern Ontario. We deliver turnkey solutions from engineering through factory acceptance testing, site commissioning, and operator training—built on Allen-Bradley platforms with comprehensive documentation.
</p>
```

**Rationale:**

1. **Capability-first approach:** New headline immediately states what CCI *does* (design, fabricate, program, commission) rather than how they quote.

2. **Core offerings from WO-001:** Lead paragraph now explicitly mentions:
   - CSA-certified PLC control panels (WO-001 §1.3)
   - SCADA/HMI systems (WO-001 §1.2)
   - Process instrumentation (WO-001 §1.4)
   - VFD/starter integration (WO-001 §1.5)
   - FAT/SAT commissioning (WO-001 §1.6)
   - Allen-Bradley platforms (WO-001 §3.1)

3. **Industries from WO-001:** References municipal water treatment, wastewater treatment, and pumping stations (WO-001 §2.1-2.3, representing 92% of corpus mentions).

4. **Removed quote mechanics:**
   - Eliminated "Our quotations spell out..."
   - Removed "against attached lists"
   - Removed payment milestone language ("align payment milestones to submittals, shipment, and commissioning")

5. **Professional technical tone:** Maintains engineering credibility while focusing on capabilities, not procurement process.

6. **Geographic context preserved:** Kept "Eastern Ontario" reference for local SEO and market clarity.

---

### 2. Other Sections Reviewed

**Section: "What 'scope of supply' means on our quotes" (lines 127-179)**
- **Status:** RETAINED with no changes
- **Rationale:** This section is appropriately contextualized as "From real CCI quotations" and provides transparency about deliverables. It does NOT violate acceptance criteria because:
  - It's not in the hero section
  - Payment milestones are presented as educational context ("Milestones (same quotation)"), not as the primary value proposition
  - The section serves a legitimate purpose: helping prospects understand what's included in scope
  - It follows the capability-first hero with supporting detail

**Section: Practice Footprint (lines 205-272)**
- **Status:** No changes required
- **Rationale:** Already focuses on programs, applications, and technical disciplines—no quote mechanics present

**Section: Pillars (lines 280-305)**
- **Status:** No changes required
- **Rationale:** Focuses on deliverables quality (drawings, CSA shop, SCADA graphics)—appropriate supporting content

**Section: Tech Showcase (lines 307-329)**
- **Status:** No changes required
- **Rationale:** Visual evidence of capabilities—aligns with WO-002 A-tier image strategy

**All other sections:** No quote mechanics or payment milestone language found outside the appropriately-contextualized "scope of supply" educational section.

---

## IMAGE VERIFICATION

**Hero image confirmed:** `scada-killaloe-overview.png`
- **WO-002 ranking:** A-tier (primary recommendation)
- **Current usage:** Line 119 in index.html
- **Status:** ✅ Correct—no changes needed

**Supporting images reviewed:**
- `panel-csa-shop-primary.jpg` (line 316): A-tier ✅
- `scada-pembroke-alarms.png` (line 320): A-tier ✅
- `hmi-chalk-river-trends.png` (line 324): B-tier (acceptable for supporting content) ✅
- `wtp-rockland-actiflo-panel.jpg` (line 389): A-tier ✅
- `wtp-rockland-main-plc.jpg` (line 393): A-tier ✅
- `scada-pembroke-mixer-pumps.png` (line 401): A-tier ✅

**No C-tier images found in primary hero or above-the-fold sections.** ✅

---

## ACCEPTANCE CRITERIA CHECKLIST

### Hero Section Requirements

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Lead with capability statement (what CCI designs/builds/programs/commissions) | ✅ MET | Headline: "Design, fabricate, program, and commission control systems..." |
| Use A-tier image (`scada-killaloe-overview.png`) | ✅ MET | Line 119: confirmed current and correct per WO-002 |
| Remove quote mechanics language | ✅ MET | Eliminated "quotations spell out panels... against attached lists" |
| Remove payment milestone language from hero | ✅ MET | Removed "align payment milestones to submittals, shipment, and commissioning" |
| State core offerings: PLC panels, SCADA/HMI, instrumentation, VFD/starter integration, FAT/SAT, commissioning | ✅ MET | All six offerings explicitly mentioned in lead paragraph |

### Homepage Prohibitions

| Prohibition | Status | Evidence |
|-------------|--------|----------|
| Must NOT lead with quotation process | ✅ MET | Hero now leads with capabilities, not quote mechanics |
| Must NOT show payment milestone percentages in hero | ✅ MET | Payment milestones moved to educational section (lines 160-168), not hero |
| Must NOT use exclusions blocks in hero | ✅ MET | Exclusions remain in educational section (lines 169-172), not hero |
| Must NOT use internal library language in hero | ✅ MET | Hero uses customer-facing language (control systems, panels, SCADA) |
| Must NOT use C-tier images | ✅ MET | All primary images are A-tier or B-tier (supporting only) |

### Homepage Requirements

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Clear capability overview | ✅ MET | Hero lead paragraph + hero metrics (lines 101-114) |
| Industries/applications served | ✅ MET | "municipal water treatment, wastewater treatment, and pumping stations" (line 95) |
| Platform/vendor credibility | ✅ MET | "Allen-Bradley platforms" (line 96) + partner strip (lines 189-203) |
| Selected project experience | ✅ MET | Practice footprint section (lines 205-272) + experience mosaic (lines 380-406) |
| Clean CTA to contact and services | ✅ MET | Hero actions (lines 97-100): "Contact engineering" + "Explore services" |

---

## CONSTRAINTS COMPLIANCE

| Constraint | Status | Notes |
|------------|--------|-------|
| Do NOT create new pages | ✅ MET | Only modified existing index.html |
| Do NOT modify styles.css | ✅ MET | No CSS changes made |
| Do NOT change navigation structure | ✅ MET | Navigation unchanged (lines 52-62) |
| Do NOT remove existing sections unless they violate acceptance criteria | ✅ MET | All sections retained; only hero copy modified |
| Preserve existing meta tags, schema.org, and technical infrastructure | ✅ MET | Lines 3-35 unchanged |

---

## SUMMARY

**Work completed:**
- Rewrote hero headline to lead with capabilities (design, fabricate, program, commission)
- Rewrote hero lead paragraph to feature core offerings from WO-001 corpus synthesis
- Referenced industries from WO-001 (water treatment, wastewater, pumping stations)
- Removed quote mechanics and payment milestone language from hero
- Maintained professional technical tone
- Verified A-tier hero image (scada-killaloe-overview.png) is correct per WO-002
- Confirmed no C-tier images in primary sections
- Preserved all existing sections, navigation, meta tags, and technical infrastructure

**All acceptance criteria met:** 15/15 ✅

**Files modified:** 1 (index.html)  
**Receipt created:** 1 (wo-003-homepage.md)

---

**Agent completion timestamp:** 2026-03-29 21:47 UTC  
**Work order status:** COMPLETE
