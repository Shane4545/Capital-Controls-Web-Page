# WORK ORDER WO-005: MARKETS PAGE REWRITE

**Objective:** Rewrite `markets.html` to clearly showcase municipal (WTP/WWTP/pumping) and specialty sectors (transit, industrial, bridges, conveyors) based on corpus evidence.

**Completion Date:** 2026-03-29  
**Agent:** Claude Sonnet 4.5

---

## FILES MODIFIED

**Primary file:**
- `c:\Cursor Projects\CCI Updare Web Page\markets.html`

---

## MARKET SEGMENTS UPDATED

### 1. Primary Market: Municipal Water & Wastewater (92%+ of corpus)

**Water Treatment Plants (WTP):**
- Added specific systems: raw water intake, chemical dosing, Actiflo clarification, membrane filtration, UV disinfection, backwash systems
- Referenced Carleton Place WTP Expansion project
- Included CompactLogix PLC and iFix SCADA integration details
- Added Siemens instrumentation specifics (magnetic flow meters, ultrasonic level transmitters)

**Wastewater Treatment Plants (WWTP):**
- Added specific systems: influent pumping, grit removal, biological treatment (activated sludge, MBR, SBR), aeration blowers, sludge handling
- Referenced Carleton Place WWTP Expansion project
- Emphasized phased commissioning capability for operating facilities
- Included VFD integration for aeration blowers

**Pumping Stations & Lift Stations:**
- Added configuration types: sanitary sewage, stormwater, water booster, raw water intake
- Listed standard features: duplex/triplex/quad configurations, lead/lag/standby rotation, cellular modem remote access
- Referenced McGee Street Lift Station (CCI-1413) and Golfview Subdivision Pumping Station (CCI-1413Q)
- Included specific equipment: CompactLogix controller, PanelView touchscreen, cellular modem

### 2. Specialty Sectors

**Transit & Infrastructure:**
- Added tunnel dewatering systems, station drainage pumping, emergency backup systems
- Referenced TTC and LRT infrastructure projects
- Noted transit-specific electrical and safety standards compliance

**Bridges & Conveyors:**
- Added swing bridge automation with motor control, position sensing, safety interlocks
- Added conveyor/material handling integration
- Emphasized use of same Allen-Bradley platform as municipal work

**Industrial Process Control:**
- Added specific applications: chemical feed systems, process water treatment, cooling tower control, compressed air systems
- Positioned as secondary market scheduled around municipal workload
- Emphasized same engineering practices apply

### 3. Platform Consistency Section

Added closing section emphasizing:
- Allen-Bradley CompactLogix/ControlLogix standard across all markets
- Siemens instrumentation consistency
- Ethernet/IP network architecture
- Benefits: parts availability, familiar programming, proven integration patterns

---

## IMAGES UPDATED

### Hero Image
**Changed from:** Generic text-only hero  
**Changed to:** `hero-killaloe-wtp.jpg` with gradient overlay  
**Rationale:** A-tier image per WO-002; shows actual CCI municipal facility work; provides visual credibility for primary market

### Supporting Images Added
1. **`scada-killaloe-overview.png`** - Placed after Water Treatment Plants section
   - A-tier image per WO-002
   - Shows live municipal WTP SCADA system
   - Demonstrates operator-grade interface capability

2. **`wtp-rockland-actiflo-panel.jpg`** - Placed after Wastewater Treatment Plants section
   - A-tier image per WO-002
   - Shows named on-site process panel
   - Reinforces municipal context

3. **`wtp-rockland-main-plc.jpg`** - Placed after Pumping Stations section
   - A-tier image per WO-002
   - Shows main PLC enclosure on site
   - Demonstrates integration quality

**Images NOT used:** C-tier images excluded per WO-002 criteria (shipping/pallet shots, legacy hardware close-ups, cluttered board-level details)

---

## CORPUS EVIDENCE INTEGRATION

### Projects Referenced
- ✅ Carleton Place WTP Expansion (Section 25 09 93)
- ✅ Carleton Place WWTP Expansion
- ✅ McGee Street Lift Station (CCI-1413)
- ✅ Golfview Subdivision Pumping Station (CCI-1413Q)
- ✅ TTC infrastructure projects
- ✅ LRT infrastructure projects

### Technical Details from Corpus
- ✅ CompactLogix 1769-L36ERM controller specifications
- ✅ iFix SCADA workstation integration
- ✅ Siemens Sitrans instrumentation (FM magnetic flow, LU ultrasonic level, P pressure)
- ✅ Actiflo clarification systems
- ✅ VFD integration for pumps and blowers
- ✅ Cellular modem remote access
- ✅ Lead/lag/standby pump rotation logic
- ✅ Ethernet/IP communication protocol
- ✅ Process Control Narratives (PCN) deliverable

### Professional Language from WO-001 Section 5
- ✅ "Supply, program, and commission PLC-based control systems with integrated HMI interfaces"
- ✅ "PLC programs written using clear organized ladder logic"
- ✅ "Programs can be understood by operators and programmers not involved in the original project"
- ✅ "Phased cutovers, temporary bypass logic, and documentation"
- ✅ "Allen-Bradley CompactLogix and ControlLogix PLCs with FactoryTalk HMI"

---

## ACCEPTANCE CRITERIA CHECKLIST

### Markets page MUST:
- ✅ Clearly show municipal sector (WTP, WWTP, pumping stations) as primary
- ✅ Show specialty sectors (transit, bridges, conveyors, industrial process)
- ✅ Use project examples from corpus (Carleton Place, McGee, Golfview, TTC, LRT)
- ✅ Use A-tier images for headers (`hero-killaloe-wtp.jpg`, `scada-killaloe-overview.png`, `wtp-rockland-actiflo-panel.jpg`, `wtp-rockland-main-plc.jpg`)
- ✅ Feel specific to CCI's actual work, not generic market descriptions

### Markets page must NOT:
- ✅ Use generic industry descriptions without CCI context (avoided - all descriptions tied to corpus evidence)
- ✅ Overstate capabilities not found in corpus (avoided - only referenced documented projects and systems)
- ✅ Use C-tier images (avoided - only A-tier images used per WO-002)

---

## CONTENT IMPROVEMENTS

### Before (Generic):
- "Raw water intake, chemical dosing, clarification, filtration..."
- No specific project references
- No equipment model numbers or vendor names
- Generic "we support" language

### After (Corpus-Based):
- "Actiflo and ballasted flocculation, gravity and membrane filtration"
- "Carleton Place WTP Expansion involved CompactLogix PLC programming with iFix SCADA workstation"
- "Siemens instrumentation including magnetic flow meters and ultrasonic transmitters"
- "McGee Street Lift Station (CCI-1413) included a SCADA panel with CompactLogix controller, PanelView touchscreen, and cellular modem"

### Specificity Improvements:
1. **Equipment models:** CompactLogix 1769-L36ERM, PanelView touchscreen
2. **Software platforms:** iFix SCADA, FactoryTalk HMI
3. **Instrumentation vendors:** Siemens Sitrans FM/LU/P series
4. **Communication protocols:** Ethernet/IP, cellular modem
5. **Project names:** Carleton Place, McGee Street, Golfview, TTC, LRT
6. **Process systems:** Actiflo, MBR, SBR, UV disinfection

---

## STRUCTURE CHANGES

### Added Sections:
1. **Primary Market callout box** - Emphasizes 92%+ municipal focus from corpus statistics
2. **Platform Consistency section** - Explains standardization benefits across all markets
3. **Inline images** - Three A-tier images with descriptive alt text

### Enhanced Sections:
1. **Water Treatment Plants** - Added typical systems list, project example, programming approach
2. **Wastewater Treatment Plants** - Added typical systems list, project example, phased commissioning emphasis
3. **Pumping Stations** - Added configuration types, standard features, two project examples
4. **Transit & Infrastructure** - Added specific applications and TTC/LRT references
5. **Bridges & Conveyors** - Split into two subsections with specific automation details
6. **Industrial Process** - Added specific applications, positioned as secondary market

### Removed Sections:
- "Industries we support" generic intro paragraph (replaced with specific market-focused content)
- "Internal tooling & documentation discipline" (moved to Services page scope)

---

## VISUAL IMPROVEMENTS

### Hero Section:
- Added background image (`hero-killaloe-wtp.jpg`)
- Applied gradient overlay for text readability
- Updated heading to emphasize municipal primary + specialty secondary structure
- Enhanced lead paragraph with specific market mentions

### Content Images:
- Three strategically placed images break up text
- All images have descriptive alt text
- Consistent styling: rounded corners, box shadows, responsive width
- Images placed after relevant section content for context

### Callout Boxes:
- Primary market callout with gradient background
- Platform consistency callout with left border accent
- Both use visual hierarchy to emphasize key messages

---

## SEO & METADATA

### Meta Description (unchanged but still accurate):
"Capital Controls markets: water treatment, wastewater, lift stations, and industrial specialty controls including bridges and conveyors."

### OG Image (unchanged):
`scada-killaloe-overview.png` - Still appropriate as A-tier image

### Heading Structure:
- H1: "Municipal water infrastructure and specialty industrial controls"
- H2: Market segments (Water Treatment Plants, Wastewater Treatment Plants, etc.)
- H3: Platform Consistency subsection

---

## WORD COUNT & READING LEVEL

**Before:** ~450 words  
**After:** ~1,100 words

**Content density improvement:**
- Added 6 specific project references
- Added 15+ equipment model/vendor names
- Added 20+ technical system descriptions
- Added 3 images with context

**Reading level:** Professional/technical audience appropriate
- Uses industry-standard terminology (CompactLogix, iFix, VFD, MBR, SBR)
- Balances technical specificity with readability
- Avoids jargon where plain language works

---

## NEXT STEPS (NOT PART OF THIS WO)

Potential future enhancements:
1. Add case study links for Carleton Place, McGee Street, Golfview projects
2. Create interactive SCADA screenshot annotations
3. Add filterable project gallery by market segment
4. Include downloadable market-specific capability statements
5. Add client testimonials from municipal operators

---

## AGENT COMPLETION TIMESTAMP

**Date:** 2026-03-29  
**Time:** 21:15 EST  
**Status:** ✅ Complete - All acceptance criteria met
