# WORK ORDER WO-001 — Corpus Synthesis (Final Rebuild)

**Receipt path:** `receipts/rebuild-wo-001-corpus.md`  
**Completion timestamp:** 2026-03-29 (local) — synthesized for premium website copy use.

---

## Source

| Field | Value |
|--------|--------|
| **Work order ID** | WO-001 |
| **Source file** | `c:\Cursor Projects\CCI Updare Web Page\assets\_sales_corpus.txt` |
| **Corpus scope** | Sales and project documentation text aggregated by job bundle (quotations, specs, schedules, forms). |

**Method (internal):** Pattern extraction via recurring phrases, specification-style language (e.g. instrumentation/control divisions), vendor/platform tokens, and `# JOB:` header labels. Findings are **paraphrased sales insights**, not client quotations. *Do not publish raw corpus statistics or job counts as marketing claims* — use the narrative positioning below only.

---

## 1. Core deliverables (what clients buy)

### PLC programming scope

- **Control logic** for pumps, blowers, mixers, chemical systems, barriers/gates, and utility processes — organized, maintainable logic with clear commenting expectations called out in spec-style language.
- **Sequences and interlocks** aligned to process narratives (auto/manual/local, permissives, alarms).
- **Integration** with field I/O, motor controls, and supervisory systems over industrial Ethernet and field protocols.
- *Citation:* Recurring spec/quotation pattern — PLC program clarity for future maintainers; ladder logic / Studio 5000–family toolchain references throughout job bundles.

### SCADA / HMI systems

- **Operator interfaces** (touch panels and PC SCADA) for status, control, alarms, and trending; remote visibility via network or cellular where projects require it.
- **Plant–satellite linkage** (e.g. lift stations reporting into central SCADA) appears as a repeat theme in municipal and pumping work.
- *Citation:* Repeated combinations of CompactLogix/ControlLogix-class controllers with PanelView-class OITs; SCADA upgrade and “pump station monitoring” language across multiple job folders.

### Panel fabrication types

- **CSA-listed industrial control panels** (UL 508A–aligned language appears repeatedly) for indoor and outdoor service.
- **Application-specific assemblies:** PLC/SCADA enclosures, **duplex/triplex/simplex** pump control panels, VFD and soft-starter enclosures, MCC-related sections, network/communications cabinets, analyzer or specialty skids tied to water/wastewater processes.
- **Environmental ratings:** NEMA 3R/4/4X and IP65/IP66 called out for harsh and outdoor sites; stainless vs. painted steel by environment.
- *Citation:* Standard quotation blocks tying **drawings, submittals, CSA certification, and commissioning** to panel supply.

### Instrumentation categories

- **Flow:** magnetic flowmeters and related flow elements (Siemens Sitrans FM, Endress+Hauser family names recur).
- **Level:** ultrasonic and hydrostatic level, switches for wet wells and tanks.
- **Pressure / analytical:** pressure/differential transmitters; water-quality and chemical parameters (chlorine, turbidity, pH/DO-style applications in municipal specs).
- **Supporting services:** configuration, loop check support, calibration documentation.
- *Citation:* Boilerplate “instrumentation includes drawings, submittals, configuration and commissioning” plus vendor cut sheets in water and industrial jobs.

### VFD / starter integration

- **VFDs** for pumps and blowers (Allen-Bradley PowerFlex and ABB families appear often); **soft starters** and **full-voltage** motor starting where appropriate.
- **PLC/SCADA coordination** for speed, bypass, and protection; PID for level/pressure/flow control in pumping applications.
- *Citation:* Dedicated jobs for VFD supply, “duplex VFD with PID,” drive replacement, and starter-to-VFD upgrades.

### FAT / SAT / commissioning

- **Factory:** panel checkout, I/O verification, communication tests, HMI/PLC dry testing before shipment.  
- **Site:** loop checks, rotation, interlocks, alarm testing, PID tuning under real process conditions, SCADA link-up.
- *Citation:* FAT/SAT and commissioning terminology dense in specs and method statements; alignment with CSA submission milestones.

### Documentation / training

- **Submittals and shop drawings** (panel GA, schematics, terminal schedules).  
- **As-builts and electronic turnover** — native PLC/HMI files plus PDFs; tag databases and narratives where specified.  
- **O&M orientation** — demonstrate operation and maintenance to owner staff; manuals and red-line/as-built expectations in contract language.
- *Citation:* Division 01 / closeout–style clauses and recurring “submit on CD/USB”–era turnover language (update to modern media in client-facing copy).

---

## 2. Primary industries (statistics & interpretation)

Statistics below are **internal synthesis signals** from the corpus (keyword presence and `# JOB:` header keywords). Categories overlap (e.g. pumping inside water plants).

| Vertical | Signal strength | Evidence (brief) |
|----------|-----------------|------------------|
| **Water treatment plants** | **High** | WTP / treatment / filter / chemical feed / booster language; OCWA hub and municipal upgrade jobs. Job-title keyword cluster ~20+ explicit treatment-plant labels; broader corpus treatment vocabulary ~2k+ hits on “water treatment” / WTP-style tokens. |
| **Wastewater treatment** | **High** | WWTP, lagoon, secondary clarifier, aeration, disinfection, thickener, screening, leachate — specs and job names combine for a strong wastewater slice alongside potable work. |
| **Pumping / lift stations** | **Very high** | Dominant repeat: sanitary/Storm **SPS**, lift stations, duplex/triplex/simplex panels, booster stations. ~40+ job headers name pumping or station work; “pump station / lift station” family terms appear thousands of times in corpus text (includes spec boilerplate). |
| **Transit infrastructure** | **Strong niche** | TTC, Metrolinx, LRT, OC Transpo, station/easier-access projects — ~14 job headers with explicit transit keywords; significant Xylem–transit pump-panel pattern. |
| **Bridge automation** | **Episodic / specialty** | Explicit bridge HMI/control jobs are rare in headers; treat as **capability proof point**, not volume lead. |
| **Conveyors / material handling** | **Low explicit** | Few conveyor-specific headers; some packaging/industrial mixer panel work — position as **adjacent industrial** when relevant. |
| **Industrial & institutional process** | **Moderate mix** | CNL/lab-adjacent, mining water treatment, hospitals (BAS-adjacent panels), universities, packaging — appears as a **diversification layer** around the municipal core. |

**Positioning takeaway for copy:** Lead with **municipal water, wastewater, and pumping**; support with **transit and complex institutional/industrial** as proof of scale and code-aware execution.

---

## 3. Platform ecosystem

### PLC brands (prevalence)

- **Rockwell / Allen-Bradley:** Dominant — CompactLogix, ControlLogix, Micro/PLC5 migration stories, Studio 5000 / RSLogix references, PanelView pairing.
- **Siemens:** Frequent in instrumentation (Sitrans) and PLC where specified (S7 family / TIA mentions in engineering packages).
- **Schneider / Modicon:** Present but lighter than Rockwell in this corpus.
- *Citation:* Token counts and BOM-style lists skew heavily Rockwell; Siemens strong on meters and level.

### SCADA / HMI software

- **FactoryTalk / PanelView** ecosystem: Very common hardware-software pairing.  
- **iFIX** and legacy SCADA hosts: Appears in plant upgrade narratives.  
- **Ignition** (Inductive Automation): Emerging mention set vs. the above — usable where projects specify it.  
- *Citation:* SCADA/HMI tokens concentrated in PanelView + plant SCADA upgrade language.

### Instrumentation vendors

- **Siemens Sitrans** (flow, level, pressure families), **Endress+Hauser**, **Rosemount**/Emerson-class devices, **Hach** / analytical for water quality — recurring in specs and RFQs.

### Standards & compliance language

- **CSA** certification on panels; **UL 508A**–style panel shop expectations.  
- **NEMA** enclosure types; **IP** ratings for outdoor/wet service.  
- **CE Code–aware** installation context (Canadian projects); **IEC**-style device references where imported equipment appears.  
- *Citation:* CSA + NEMA + IP co-occur with nearly every custom panel quotation block.

---

## 4. Professional copy patterns (premium sales website)

Use as **headlines, subheads, or value bullets** — technical, client-facing, no internal estimating jargon:

1. **From treatment plant to lift station — one accountable controls partner for programming, panels, and field commissioning.**  
2. **CSA-certified control panels built for outdoor and wet environments, documented for inspectors and your long-term O&M team.**  
3. **Clear, maintainable PLC logic and graphics — engineered so the next integrator or staff programmer can support the system with confidence.**  
4. **SCADA and operator interfaces that turn complex processes into actionable alarms, trends, and secure remote visibility.**  
5. **Proven integration of drives, starters, and process instruments — tuned on real flows, levels, and pressures — not only in the factory.**  
6. **Factory and site acceptance testing structured around your milestones: I/O verification, interlocks, and documented sign-off.**  
7. **Complete turnover: native software files, as-builts, and training that align with municipal closeout and audit expectations.**  
8. **Municipal water and wastewater expertise — pumping, chemical systems, disinfection, and plant-wide upgrades delivered with field discipline.**  
9. **Transit-grade reliability for station and infrastructure pumping — engineered for uptime, maintainability, and safety interlocks.**  
10. **Modernization paths for legacy PLCs and SCADA — planned cutovers that protect production and compliance.**  
11. **Instrumentation selected and commissioned for harsh service: wet wells, vaults, and exposed structures.**  
12. **Network-ready controls: industrial Ethernet, secure remote access, and coordination with your IT and operations standards.**  
13. **Single-source accountability from shop drawings and submittals through startup — fewer gaps between design intent and what runs on site.**  
14. **Partnership tone with consultants and contractors — we execute the control scope so the larger project stays on track.**  
15. **Canadian project experience with codes, enclosure standards, and documentation packages owners actually file and reuse.**

---

## Completion criteria (met)

- [x] Receipt exists at `c:\Cursor Projects\CCI Updare Web Page\receipts\rebuild-wo-001-corpus.md`.  
- [x] Work order ID, source path, categorized findings, platform notes, and **15** professional phrases included.  
- [x] Content is **pattern-based**, oriented to **buyer outcomes**, suitable to inform premium site copy without exposing internal corpus metrics in public-facing text.

---

*End of receipt WO-001 (rebuild).*
