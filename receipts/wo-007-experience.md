# WORK ORDER WO-007: EXPERIENCE PAGE REWRITE

**Objective:** Rewrite `experience.html` with curated project showcase using strong representative projects and A-tier visuals, avoiding giant undifferentiated lists.

**Completion Date:** 2026-03-29  
**Agent:** Claude Sonnet 4.5

---

## FILES MODIFIED

**Primary file:**
- `c:\Cursor Projects\CCI Updare Web Page\experience.html`

**Changes:**
- Replaced generic gallery-first structure with curated project showcase
- Added hero header with A-tier background image (panel-csa-shop-primary.jpg)
- Created 9 featured project blocks with technical depth
- Moved SCADA/HMI gallery to supporting role below featured projects
- Retained visual assets but reorganized hierarchy
- Updated page hero lead text to emphasize capabilities over gallery navigation

---

## PROJECTS FEATURED

### Selection rationale

Projects selected based on three criteria:
1. **File count from sales-stats.json** (proxy for project complexity and documentation volume)
2. **Corpus evidence from WO-001** (projects explicitly mentioned or with strong deliverable patterns)
3. **Market segment diversity** (WTP, WWTP, pumping, transit, industrial representation)

### Featured projects (in order of appearance)

| Project | Market Segment | File Count | Rationale |
|---------|---------------|------------|-----------|
| **Carleton Place WTP/WWTP Upgrade** | Water/Wastewater | 356 | Explicitly mentioned in WO-001 corpus as example project; combined WTP/WWTP shows full treatment plant capability |
| **B&M Hurdman Station** | Transit Infrastructure | 1,541 | Largest project by file count; demonstrates transit/infrastructure capability beyond water/wastewater |
| **ROPEC Wastewater Treatment Facilities** | Wastewater (WWTP) | 698 (combined) | Multiple phases (Secondary Clarifiers 309, Disinfection 216, Aeration 105, Polymer 98); repeat client shows long-term partnership; major municipal WWTP |
| **TTC Warden & Islington Stations** | Transit Infrastructure | 1,039 (combined) | Warden 639 + Islington 400; demonstrates Toronto transit work and Xylem partnership |
| **Ottawa LRT Pump Panels & Accessory Sumps** | Light Rail Transit | 882 (combined) | LRT Pump Panels 486 + Accessory Sumps 396; shows LRT capability and high documentation standards |
| **Golfview Subdivision Pumping Station** | Pumping/Lift Station | 1,115 | Second-largest by file count; demonstrates residential development pumping station work |
| **Cumberland SPS 2, 3, 4 Rehabilitation** | Pumping Stations | 92 | Multiple-station rehabilitation shows modernization/retrofit capability |
| **Napanee WPCP (Sheridan)** | Wastewater (WWTP) | 209 | Demonstrates subcontractor relationship and full WWTP scope |
| **Ingleside WWTP Phase 1** | Wastewater (WWTP) | 124 | New plant construction (vs. retrofit); shows scalable architecture design |

**Market segment coverage:**
- Water treatment plants: 1 featured (Carleton Place WTP)
- Wastewater treatment plants: 4 featured (Carleton Place WWTP, ROPEC, Napanee, Ingleside)
- Pumping/lift stations: 2 featured (Golfview, Cumberland)
- Transit infrastructure: 3 featured (Hurdman, TTC, LRT)
- **Total: 9 featured projects** (meets 8-12 target range)

---

## IMAGES UPDATED

### Hero header background
**Image:** `panel-csa-shop-primary.jpg` (A-tier per WO-002)  
**Usage:** Page hero header background with gradient overlay  
**Rationale:** CSA shop interior communicates build quality and organized execution—high trust signal for panel buyers

### Gallery images retained
All A-tier and B-tier images retained in supporting galleries below featured projects:

**SCADA/HMI samples section:**
- scada-killaloe-overview.png (A-tier)
- scada-pembroke-mixer-pumps.png (A-tier)
- scada-pembroke-alarms.png (A-tier)
- hmi-chalk-river-trends.png (B-tier)
- hmi-chalk-river-alarm-summary.png (B-tier)

**CSA shop & field integration section:**
- panel-csa-shop-primary.jpg (A-tier)
- panel-csa-shop-secondary.jpg (A-tier)
- wtp-rockland-actiflo-panel.jpg (A-tier)
- wtp-rockland-main-plc.jpg (A-tier)
- gallery-chalk-river-filters.jpg (B-tier)
- gallery-killaloe-wtp-02.jpg (A-tier)
- hero-killaloe-wtp.jpg (A-tier)
- drawing-bishop-panel.png (A-tier)

**Removed from primary path:**
- C-tier images removed from main gallery (wtp-ingleside-field.jpg, hero-installation.jpg, plc-scada-site.jpg, field-work.jpg, site-work-2.jpg)
- "Engineering deliverables & internal tools" section removed (excel-cc-tools.png, panel.jpg) to reduce clutter
- "Logistics & legacy hardware archive" section removed entirely

---

## STRUCTURE COMPARISON

### Before (original structure)
1. Page hero with gallery-focused messaging
2. SCADA/HMI gallery (5 images)
3. Engineering deliverables & internal tools (3 images)
4. CSA shop & site integration (8 images)
5. Logistics & legacy hardware archive (collapsible, 5 images)
6. Generic prose blocks (municipal themes, SCADA modernization, panel replacement, references)

**Issues:**
- Gallery-first approach buried project context
- No specific project names or technical depth
- Generic prose didn't demonstrate capability
- Felt like internal photo archive rather than capability showcase

### After (curated structure)
1. Page hero with capability-focused messaging and A-tier background
2. **Featured projects section (9 detailed project blocks)**
   - Project name and location
   - Market segment identification
   - Scope description with technical specifics
   - Key deliverables with equipment/platforms
3. Additional experience prose block (summary of broader portfolio)
4. SCADA/HMI samples gallery (supporting visual evidence)
5. CSA shop & field integration gallery (supporting visual evidence)
6. References & detailed case studies (call-to-action)

**Improvements:**
- Project-first approach with named facilities and technical depth
- Market segment diversity clearly demonstrated
- Equipment and platforms explicitly listed (CompactLogix, ControlLogix, iFix, Siemens, etc.)
- File counts used as complexity proxy without exposing internal metrics
- Visual hierarchy: featured projects → supporting galleries → CTA
- A-tier images prominently featured (hero background, gallery leads)

---

## ACCEPTANCE CRITERIA CHECKLIST

### Experience page MUST (all met ✓)

- ✓ **Use strong representative projects**
  - Carleton Place WTP/WWTP (corpus example)
  - ROPEC facilities (multiple phases, repeat client)
  - TTC stations (transit infrastructure)
  - LRT projects (light rail transit)
  - Hurdman (largest by file count)
  - Golfview (second-largest by file count)

- ✓ **Show project diversity**
  - WTP: 1 featured (Carleton Place)
  - WWTP: 4 featured (Carleton Place, ROPEC, Napanee, Ingleside)
  - Pumping: 2 featured (Golfview, Cumberland)
  - Transit: 3 featured (Hurdman, TTC, LRT)

- ✓ **Use A-tier images prominently**
  - Hero background: panel-csa-shop-primary.jpg (A-tier)
  - Gallery leads: scada-killaloe-overview.png, scada-pembroke-mixer-pumps.png (A-tier)
  - All A-tier images from WO-002 retained in galleries

- ✓ **Avoid giant undifferentiated project lists**
  - 9 featured projects with detailed descriptions (not bullet lists)
  - Each project block includes context, scope, and deliverables
  - Additional experience summarized in prose (not exhaustive list)

- ✓ **Show technical depth**
  - Equipment specified: CompactLogix, ControlLogix, iFix, PanelView Plus, Siemens instrumentation
  - Scope items: PLC programming, SCADA graphics, instrumentation, VFDs, network integration
  - Deliverables: CSA certification, FAT/SAT, commissioning, operator training, as-builts

### Experience page MUST NOT (all avoided ✓)

- ✓ **NOT list every job as bullet point**
  - Featured projects presented as detailed prose blocks
  - Additional experience summarized without exhaustive enumeration

- ✓ **NOT use C-tier images**
  - All C-tier images removed from primary path
  - Only A-tier and B-tier images retained in galleries

- ✓ **NOT feel like internal project archive**
  - Project-first structure with client-facing context
  - Technical depth without internal jargon
  - Market segments and applications clearly identified

- ✓ **NOT show file counts or internal metrics**
  - File counts used for project selection rationale (in receipt only)
  - Not exposed in public-facing HTML
  - Complexity conveyed through scope descriptions, not metrics

---

## KEY CONTENT PATTERNS FROM CORPUS

### Technical platforms explicitly mentioned
- Allen-Bradley CompactLogix PLCs (pumping stations, small systems)
- Allen-Bradley ControlLogix PLCs (large WTP/WWTP)
- FactoryTalk View / PanelView Plus HMI
- iFix SCADA workstations
- Siemens process instrumentation (flow, level, pressure, analytical)
- Ethernet/IP network protocol
- VFD integration (PowerFlex, ABB, Danfoss)
- CSA certification to UL 508A standards
- NEMA 4X stainless steel enclosures

### Deliverable patterns consistently shown
- Custom PLC programming with clear ladder logic
- Process control narratives (PCN)
- HMI/SCADA graphics development
- Instrumentation supply and configuration
- Network integration (Ethernet/IP, fiber optic, cellular)
- Factory acceptance testing (FAT)
- Site acceptance testing (SAT)
- Operator training
- As-built documentation (PLC programs, HMI graphics, shop drawings)
- O&M manuals

### Market applications demonstrated
- Water treatment: raw water intake, clarification, filtration, UV disinfection, high lift pumping
- Wastewater treatment: influent screening, biological treatment, clarification, sludge handling
- Pumping stations: sanitary sewage, stormwater, water booster, lead/lag control
- Transit infrastructure: dewatering, drainage, HVAC, emergency systems

---

## VISUAL HIERARCHY IMPROVEMENTS

### Before
- Gallery-first approach buried project context
- Equal visual weight to all images (including C-tier)
- No clear entry point for technical buyers vs. visual browsers

### After
- **Primary layer:** Featured project prose blocks (detailed, scannable, keyword-rich)
- **Secondary layer:** SCADA/HMI gallery (visual proof of operator interfaces)
- **Tertiary layer:** CSA shop & field gallery (build quality and integration evidence)
- **Call-to-action:** References request (conversion point for qualified leads)

### A-tier image prominence
- Hero background: panel-csa-shop-primary.jpg (immediate trust signal)
- Gallery leads: SCADA overviews and process graphics (operator-grade systems)
- Supporting: shop photos, site integration, facility exteriors (credibility depth)

---

## MESSAGING IMPROVEMENTS

### Before (generic)
> "Gallery order matches how we present in RFPs: operator graphics and CAD first, then CSA shop evidence, then site integration."

**Issue:** Internal process language, not client benefit-focused

### After (capability-focused)
> "Control system integration for municipal treatment plants, pumping stations, and critical infrastructure—CompactLogix/ControlLogix PLCs, SCADA/HMI development, CSA-certified panels, and full commissioning."

**Improvement:** Clear capability statement with platforms and deliverables

### Featured project blocks
Each project now includes:
1. **Project name** (real facility, not generic description)
2. **Market segment** (WTP/WWTP/pumping/transit)
3. **Location** (Ontario municipalities, Toronto/Ottawa transit)
4. **Scope** (systems controlled, complexity indicators)
5. **Key deliverables** (platforms, equipment, commissioning, documentation)

**Result:** Technical depth without internal jargon; scannable for RFP writers and technical buyers

---

## AGENT COMPLETION TIMESTAMP

**Completed:** 2026-03-29 19:15 EST

**Work order status:** ✓ Complete

**Next steps:**
- Review updated experience.html in browser
- Verify hero background image renders correctly with gradient overlay
- Confirm all internal links functional (contact.html references)
- Consider adding project year/date if available from sales records (optional enhancement)
- Monitor page performance with new hero background image (panel-csa-shop-primary.jpg is A-tier but verify file size)

---

**End of Receipt**
