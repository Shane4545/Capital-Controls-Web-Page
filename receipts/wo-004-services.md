# WORK ORDER WO-004: SERVICES PAGE REWRITE

**Objective:** Rewrite `services.html` to accurately reflect recurring deliverables and scope patterns found in the sales corpus, making the page feel commercial and technical rather than internal.

**Completion Date:** 2026-03-29  
**Agent:** Claude Sonnet 4.5

---

## FILES MODIFIED

**Primary file:** `c:\Cursor Projects\CCI Updare Web Page\services.html`

---

## KEY CHANGES MADE

### 1. Page Hero Header
**Before:** Generic "Engineering services from schematic to SAT" with no visual context  
**After:** Hero with A-tier image (`panel-csa-shop-primary.jpg`) background and updated messaging: "Control system integration from design through commissioning"—emphasizes turnkey automation solutions for water/wastewater/pumping stations

### 2. Content Structure - Complete Rewrite
Replaced internal-focused "quotation scope" section with eight corpus-based service sections:

#### Section 1: PLC Programming & Control System Integration
- **Based on:** WO-001 Section 1.1 (PLC Programming Scope)
- **Key deliverables added:**
  - Allen-Bradley CompactLogix (1769-L33ER/L36ERM) and ControlLogix (1756-L73/L83E) platforms
  - Custom ladder logic with clear documentation and descriptive tags
  - Process Control Narratives (PCN) describing control strategies
  - PID loop configuration and tuning
  - Alarm and interlock programming
  - Electronic deliverables in native RSLogix format + PDF

#### Section 2: CSA-Certified Control Panel Fabrication
- **Based on:** WO-001 Section 1.3 (Panel Fabrication Scope)
- **Key deliverables added:**
  - Panel types: PLC/SCADA control panels, VFD panels, soft starter panels, FVNR starter panels, MCC sections, network/RPU panels
  - NEMA 4/4X and IP65/IP66 ratings with stainless steel (304/316) construction
  - Standard features: hinged doors, 3-point latching, interior lighting, laptop shelf, panel heaters
  - Component integration: Allen-Bradley PLCs, Phoenix Contact terminal blocks, surge protection
  - Shop drawings: single-line diagrams, wiring diagrams, terminal schedules, panel layouts
  - Factory Acceptance Testing (FAT) with documented procedures
- **Image:** Retained `panel-csa-shop-primary.jpg` (A-tier) with updated caption emphasizing CSA certification and municipal applications

#### Section 3: SCADA & HMI Development
- **Based on:** WO-001 Section 1.2 (SCADA/HMI System Patterns)
- **Key deliverables added:**
  - SCADA platforms: GE iFix, FactoryTalk View SE, AVEVA Wonderware
  - HMI hardware: Allen-Bradley PanelView Plus 7 touchscreens (7", 10", 12", 15")
  - Graphical displays: plant-wide overviews, equipment faceplates, trend groups, alarm summaries
  - Alarm management: priority-based alarming, flood suppression
  - Operator control interfaces: Auto/Manual/Local modes, setpoint adjustment
  - Historical trending and data logging
- **Image:** Retained `scada-killaloe-overview.png` (A-tier) with updated caption emphasizing real-time operator context

#### Section 4: Process Instrumentation Supply & Configuration
- **Based on:** WO-001 Section 1.4 (Instrumentation Patterns)
- **Key deliverables added:**
  - Magnetic flow meters: Siemens Sitrans FM, Endress+Hauser Promag (DN50-DN600)
  - Ultrasonic level transmitters: Siemens Sitrans Probe LU, E+H Prosonic
  - Pressure transmitters: Siemens Sitrans P, E+H Cerabar
  - Analytical instruments: Hach, YSI, E+H (pH, turbidity, chlorine, DO)
  - Float switches and level sensors: Magnetrol, Gems
  - Specifications: 4-20mA with HART, 316L stainless steel, IP68 submersible, explosion-proof ratings
- **Note:** Emphasized Siemens authorization for commissioning in Ontario

#### Section 5: VFD & Motor Starter Integration
- **Based on:** WO-001 Section 1.5 (VFD/Starter Integration Patterns)
- **Key deliverables added:**
  - VFD applications: low lift pumps, high lift pumps, backwash pumps, WAS pumps, blowers, mixers
  - VFD brands: Allen-Bradley PowerFlex 525/755, ABB ACS580/ACS880, Danfoss VLT
  - Starter types: VFD, soft starter, FVNR, combination starters
  - Integration features: Ethernet/IP or Modbus TCP, integrated bypass contactors, motor overload protection, remote start/stop
  - Panel construction: NEMA 3R/4X or IP65 ratings

#### Section 6: Factory & Site Acceptance Testing
- **Based on:** WO-001 Section 1.6 (Testing/Commissioning Patterns)
- **Key deliverables added:**
  - Factory Acceptance Testing (FAT): panel inspection, CSA verification, power-up testing, PLC simulation, HMI navigation, network testing
  - Site Acceptance Testing (SAT): field device loop checks, motor rotation verification, interlock testing, PID loop tuning, SCADA communication verification
  - Commissioning deliverables: test reports, as-built programs, calibration certificates, loop check documentation
  - PLC output verification by forcing outputs
  - Process performance testing support

#### Section 7: Network Infrastructure & Remote Access
- **Based on:** WO-001 Section 3.5 (Network/Communication Protocols)
- **Key deliverables added:**
  - Managed switches: Allen-Bradley Stratix 5200/5800, Cisco Industrial Ethernet (VLAN, QoS, RSTP, DLR)
  - Fiber optic: single-mode (>2km), multi-mode (up to 2km), LC/SC connectors
  - Communication protocols: Ethernet/IP (primary), Modbus TCP, Modbus RTU RS485, HART
  - Remote access: cellular modems (Sierra Wireless, Digi), VPN routers, static IP/dynamic DNS
  - Network panels: switches, fiber converters, cellular modems in NEMA enclosures

#### Section 8: Documentation & Training
- **Based on:** WO-001 Section 1.7 (Documentation Deliverables) and 1.8 (Support/Training Patterns)
- **Key deliverables added:**
  - Shop drawings: panel arrangements, single-line diagrams, wiring diagrams, terminal schedules
  - Control system documentation: PLC programs (RSLogix + PDF), HMI graphics (FactoryView + PDF), tag database, PCN, network diagrams
  - Instrumentation documentation: data sheets, calibration certificates, installation details, wiring schedules
  - As-built records: marked-up drawings, final programs, updated P&IDs, network configs
  - O&M manuals: operation procedures, maintenance schedules, troubleshooting guides, spare parts lists
  - Operator training: 4-8 hours on-site, HMI navigation, alarm handling, setpoint adjustment, emergency procedures

#### Section 9: Typical Scope Inclusions
- **Based on:** WO-001 Section 4.1 (Typical Scope Inclusions)
- **Lists standard deliverables:** CSA-certified panels, PLC/HMI programming, instrumentation, drawings, FAT, SAT, training, as-builts, one-year warranty

#### Section 10: Typical Scope Exclusions
- **Based on:** WO-001 Section 4.2 (Typical Scope Exclusions)
- **Lists items by others:** electrical permits, field wiring, conduit installation, panel mounting, grounding, civil work, process equipment, vendor panels, TSH sensors, spare parts

### 3. Professional Language Patterns
Applied professional technical language from WO-001 Section 5 throughout:
- "Supply, program, and commission PLC-based control systems" (not "we do PLC programming")
- "Design and fabricate CSA-certified control panels engineered to meet project-specific requirements" (not "we build panels")
- "Develop centralized SCADA systems providing operators with real-time process visualization" (not "we make SCADA screens")
- "Configure and commission variable frequency drives with seamless integration" (not "we install VFDs")
- "Deliver complete as-built documentation" (not "we provide documentation")

### 4. Meta Description Update
**Before:** "Capital Controls services: electrical schematics, control panels, PLC, SCADA/HMI graphics, instrumentation, FAT/SAT, documentation."  
**After:** "PLC programming, CSA-certified panel fabrication, SCADA/HMI development, instrumentation, and commissioning services for water, wastewater, and pumping stations."

### 5. Open Graph Updates
- Updated og:description to "Turnkey control system integration from design through commissioning."
- Updated og:image to `panel-csa-shop-primary.jpg` (A-tier image per WO-002)

---

## IMAGES UPDATED

### Hero Header Image
- **Added:** `panel-csa-shop-primary.jpg` as hero background (A-tier per WO-002)
- **Rationale:** WO-002 recommendation—"CSA shop interior communicates build quality and organized execution—high trust for panel buyers"

### In-Content Images
- **Retained:** `panel-csa-shop-primary.jpg` in Section 2 (A-tier)
- **Retained:** `scada-killaloe-overview.png` in Section 3 (A-tier)
- **Updated captions:** Both captions revised to emphasize municipal applications and operator context (removed internal project references)

### Images Removed
- No C-tier images were present in original services.html
- All retained images are A-tier per WO-002 recommendations

---

## ACCEPTANCE CRITERIA CHECKLIST

✅ **Core offerings clearly presented:**
- [x] PLC programming (Section 1)
- [x] SCADA/HMI (Section 3)
- [x] Panel fabrication (Section 2)
- [x] Instrumentation (Section 4)
- [x] VFD/starter integration (Section 5)
- [x] FAT/SAT (Section 6)
- [x] Commissioning (Section 6)
- [x] Documentation (Section 8)

✅ **Deliverables explained using WO-001 findings:**
- [x] PLC deliverables: ladder logic, PCN, PID loops, alarms, electronic copies
- [x] Panel deliverables: CSA certification, NEMA ratings, shop drawings, FAT
- [x] SCADA deliverables: graphical displays, alarm management, trending
- [x] Instrumentation deliverables: flow/level/pressure/analytical devices, calibration certificates
- [x] VFD deliverables: configuration, commissioning, Ethernet/IP integration
- [x] FAT/SAT deliverables: test reports, as-built programs, loop checks
- [x] Documentation deliverables: shop drawings, control system docs, as-builts, O&M manuals

✅ **Professional technical language suitable for engineers and procurement:**
- [x] Used corpus-based professional wording patterns from WO-001 Section 5
- [x] Avoided generic marketing fluff
- [x] Technical specifications included (model numbers, ratings, protocols)
- [x] Industry-standard terminology (CompactLogix, ControlLogix, Ethernet/IP, NEMA 4X, CSA/UL 508A)

✅ **A-tier or B-tier images only (per WO-002):**
- [x] Hero: `panel-csa-shop-primary.jpg` (A-tier)
- [x] Section 2: `panel-csa-shop-primary.jpg` (A-tier)
- [x] Section 3: `scada-killaloe-overview.png` (A-tier)
- [x] No C-tier images used

✅ **Feels like commercial capability statement:**
- [x] Structured as service offerings with deliverables
- [x] Technical depth appropriate for municipal procurement
- [x] Clear scope inclusions/exclusions (Sections 9-10)
- [x] Professional tone throughout

✅ **Does NOT include:**
- [x] No generic marketing fluff
- [x] No internal quote mechanics
- [x] No file counts or archive statistics
- [x] No C-tier images

---

## TECHNICAL ACCURACY VERIFICATION

All technical content verified against WO-001 corpus synthesis:

- **PLC models:** 1769-L33ER, 1769-L36ERM, 1756-L73, 1756-L83E (Section 3.1 of WO-001)
- **HMI platforms:** FactoryTalk View, iFix, Wonderware (Section 3.2 of WO-001)
- **Panel ratings:** NEMA 4/4X, IP65/IP66, CSA/UL 508A (Section 3.3 of WO-001)
- **Instrumentation vendors:** Siemens (primary), Endress+Hauser, Hach, YSI (Section 3.4 of WO-001)
- **VFD brands:** Allen-Bradley PowerFlex, ABB ACS, Danfoss VLT (Section 1.5 of WO-001)
- **Network protocols:** Ethernet/IP, Modbus TCP, HART (Section 3.5 of WO-001)
- **FAT/SAT procedures:** Verified against Section 1.6 of WO-001

---

## BEFORE/AFTER COMPARISON

### Content Focus Shift
**Before:** Internal-focused "quotation scope" section with references to specific job numbers (CCI-T-338Q, CCI1444, Golfview subdivision)  
**After:** Commercial capability statement with clear service offerings and deliverables

### Technical Depth
**Before:** Generic service descriptions ("electrical schematics & panel design", "PLC application development")  
**After:** Specific deliverables with model numbers, ratings, and technical specifications

### Professional Tone
**Before:** Mix of internal language ("what our quotations actually include", "tender hygiene", "sales documents")  
**After:** Consistent commercial language suitable for engineers and procurement ("supply, program, and commission", "design and fabricate", "develop centralized SCADA systems")

### Visual Impact
**Before:** No hero image, generic page layout  
**After:** A-tier hero image (CSA shop) establishing credibility, strategic use of A-tier images throughout

---

## WORK ORDER STATUS

**Status:** ✅ COMPLETE

All acceptance criteria met:
- Services page rewritten with corpus-based deliverables
- Professional technical language applied throughout
- A-tier images used exclusively (per WO-002)
- Content feels commercial and technical (not internal)
- Receipt created with comprehensive change summary

---

**Agent completion timestamp:** 2026-03-29 21:15 UTC
