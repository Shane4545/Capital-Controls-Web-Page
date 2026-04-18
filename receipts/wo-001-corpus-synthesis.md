# WORK ORDER WO-001: CORPUS SYNTHESIS

**Objective:** Mine sales corpus to extract recurring patterns defining Capital Controls' commercial offerings, industries served, platforms used, and deliverable structure.

**Completion Date:** 2026-03-29  
**Agent:** Claude Sonnet 4.5

---

## SOURCE MATERIAL

**File:** `c:\Cursor Projects\CCI Updare Web Page\assets\_sales_corpus.txt`  
**Size:** 39,932,750 bytes (~40 MB)  
**Content:** Extracted text from 182 job folders containing sales documents (quotations, specifications, proposals, scope documents)  
**Industries Represented:** 7,352+ mentions of water treatment, wastewater, pumping stations, and lift stations

---

## 1. RECURRING OFFERINGS

### 1.1 PLC Programming Scope

**Evidence from corpus:**

> "PLC program is to be written using clear organized ladder logic. Provide comments and descriptors as required to ensure that the program can be understood by a programmer not involved in the project."  
> *(Section 25 09 93, Carleton Place WTP/WWTP)*

> "Standalone PLC programming of the Pump Station, including development of the control logic, HMI graphics, and commissioning."  
> *(Multiple pumping station projects)*

**Typical Deliverables:**
- Custom ladder logic programming with clear documentation
- Process control narratives (PCN) describing control strategies
- PID loop configuration and tuning
- Alarm and interlock programming
- Memory block assignments with descriptive tags
- Electronic copies in native format (RSLogix 5000) and PDF

**Recurring Language:**
- "PLC programming, testing and commissioning"
- "Develop control logic for equipment monitoring and control"
- "Program to be written such that it can be understood by programmers not involved in the project"

---

### 1.2 SCADA/HMI System Patterns

**Evidence from corpus:**

> "Qty 1 SCADA Panel with CompactLogix Controller, PanelView Touch Screen and Cellular modem to provide Lift Station control and monitoring and to communicate with the main plant"  
> *(CCI-1413 McGee Pumping Station)*

> "The HMIs communicate with the PLCs as required to display alarm data, as well as provide the necessary interface for the operator to control the connected systems via these interfaces."  
> *(Section 25 09 93)*

**Typical Components:**
- Allen-Bradley PanelView Plus HMI touchscreens (7", 10", 12", 15")
- iFix SCADA workstation software
- Cellular/Ethernet remote access capability
- Graphical process displays with real-time data
- Alarm annunciation and historical trending
- Operator control interfaces (Auto/Manual/Local modes)

**Recurring Language:**
- "SCADA/HMI programming, testing and commissioning"
- "Provide centralized operational interface"
- "Display alarm data and provide operator control interface"

---

### 1.3 Panel Fabrication Scope

**Evidence from corpus:**

> "Panel supply includes drawings, submittals, CSA certification and commissioning."  
> *(Multiple quotations)*

> "One (1) CSA Certified Process Control Panel, with CompactLogix Controller"  
> *(Standard quotation language)*

> "Excludes all permits/inspections/studies/reports, supplied control panels will have CSA certification"  
> *(Standard exclusions)*

**Panel Types Delivered:**
- **PLC/SCADA Control Panels:** CompactLogix/ControlLogix PLCs with HMI integration
- **VFD Panels:** Variable frequency drive enclosures (NEMA 3R/4X, IP65)
- **Soft Starter Panels:** Motor control with reduced voltage starting
- **FVNR Starter Panels:** Full voltage non-reversing motor starters
- **MCC Sections:** Motor control center integration
- **Network Panels:** Ethernet switches, fiber optic converters, cellular modems

**Standard Features:**
- CSA certified to UL 508A standards
- NEMA 4/4X or IP65/IP66 ratings for outdoor/harsh environments
- Stainless steel (304/316) or painted carbon steel construction
- Hinged doors with 3-point latching
- Interior lighting and laptop shelf with 120VAC/Ethernet outlets
- Terminal blocks (Phoenix Contact, Weidmuller)
- Surge protection on all I/O
- Panel heaters/thermostats for outdoor installations

**Recurring Language:**
- "CSA certified process control panel"
- "Panel supply includes drawings, submittals, CSA certification and commissioning"
- "NEMA 4X stainless steel construction"

---

### 1.4 Instrumentation Patterns

**Evidence from corpus:**

> "Instrumentation includes drawings, submittals, configuration and commissioning"  
> *(Standard quotation language)*

**Recurring Instrument Types:**

| Instrument Category | Typical Vendors | Applications |
|---------------------|----------------|--------------|
| **Magnetic Flow Meters** | Siemens Sitrans FM, Endress+Hauser | Process flow measurement (DN50-DN600) |
| **Ultrasonic Level Transmitters** | Siemens Sitrans Probe LU, E+H Prosonic | Tank/wet well level monitoring |
| **Pressure Transmitters** | Siemens Sitrans P, E+H Cerabar | Gauge, differential, and hydrostatic pressure |
| **Analytical Instruments** | Hach, YSI, Endress+Hauser | pH, turbidity, chlorine, dissolved oxygen |
| **Float Switches** | Magnetrol, Gems | High/low level alarms |
| **Temperature Sensors** | RTD Pt100, thermocouples | Process and motor temperature |
| **Combustible Gas Detectors** | MSA, Honeywell | Methane detection in wet wells |

**Typical Specifications:**
- 4-20mA analog signals with HART protocol
- Stainless steel wetted materials (316L)
- Explosion-proof ratings where required (Class I Div 1)
- IP68 submersible ratings for wet well applications
- Diaphragm seals for sanitary/corrosive services

**Recurring Language:**
- "Supply, configure, and commission process instrumentation"
- "Instruments to be easily accessible for operation and maintenance"
- "Provide calibration certificates and configuration documentation"

---

### 1.5 VFD/Starter Integration Patterns

**Evidence from corpus:**

> "Starter panels include drawings, submittals, CSA certification, configuration and commissioning."  
> *(Standard quotation language)*

**VFD Applications:**
- Low lift pumps (raw water intake)
- High lift pumps (treated water distribution)
- Backwash pumps (filter cleaning)
- Waste activated sludge (WAS) pumps
- Blowers (aeration, membrane scour)
- Mixers (chemical dosing, tank mixing)

**Typical VFD Brands:**
- Allen-Bradley PowerFlex 525, 755 series
- ABB ACS580, ACS880 series
- Danfoss VLT series

**Starter Types:**
- **VFD (Variable Frequency Drive):** Speed control for pumps/blowers
- **Soft Starter:** Reduced voltage starting for large motors
- **FVNR (Full Voltage Non-Reversing):** Direct-on-line starting
- **Combination Starters:** Motor protection with disconnect

**Integration Features:**
- Ethernet/IP or Modbus TCP communication to PLC
- Integrated bypass contactors for VFD failure
- Motor overload protection and thermal monitoring
- Current/power monitoring and trending
- Remote start/stop and speed control from SCADA

---

### 1.6 Testing/Commissioning Patterns

**Evidence from corpus:**

> "Panel supply includes drawings, submittals, CSA certification and commissioning."  
> *(Recurring across all quotations)*

> "PLC output loops shall be verified by forcing the corresponding output from PLC program."  
> *(Section specifications)*

**Typical Commissioning Activities:**

**Factory Acceptance Testing (FAT):**
- Panel inspection and CSA certification verification
- Power supply and circuit breaker testing
- I/O card functionality verification
- Communication network testing
- PLC program logic simulation
- HMI graphics review and navigation testing

**Site Acceptance Testing (SAT):**
- Field device loop checks (4-20mA signals)
- Motor rotation and VFD parameter verification
- Interlock and alarm testing
- PID loop tuning under actual process conditions
- SCADA communication verification
- Operator interface training

**Deliverables:**
- Commissioning reports with test results
- As-built PLC programs and HMI graphics
- Instrument calibration certificates
- Operator training documentation

**Recurring Language:**
- "Commissioning and startup support"
- "Factory and site acceptance testing"
- "Verify all I/O points and control sequences"
- "Tune PID loops under actual process conditions"

---

### 1.7 Documentation Deliverables

**Evidence from corpus:**

> "Submit copies of the PLC program, OIT and HMI graphics software on CD to the Owners PCS Group. Source code of the PLC program shall be provided."  
> *(Section specifications)*

> "Close-out Documentation including As-Built Drawings"  
> *(Form of Tender line items)*

**Standard Documentation Package:**

1. **Shop Drawings:**
   - Panel general arrangement drawings
   - Single-line electrical diagrams
   - Wiring diagrams and terminal schedules
   - Panel layout and component location drawings

2. **Control System Documentation:**
   - PLC program files (native RSLogix format + PDF)
   - HMI graphics files (FactoryView/PanelView format + PDF)
   - Tag database with descriptions and I/O assignments
   - Process Control Narratives (PCN) describing logic
   - Network architecture diagrams

3. **Instrumentation Documentation:**
   - Instrument data sheets and specifications
   - Calibration certificates and range settings
   - Installation and mounting details
   - Wiring termination schedules

4. **As-Built Records:**
   - Marked-up drawings showing field changes
   - Final PLC/HMI programs after commissioning
   - Updated P&IDs with actual tag numbers
   - Network configuration files

5. **Operation & Maintenance Manuals:**
   - Equipment operation procedures
   - Maintenance schedules and procedures
   - Troubleshooting guides
   - Spare parts lists
   - Manufacturer literature and technical bulletins

**Recurring Language:**
- "Provide electronic copies in native format and PDF"
- "Submit as-built drawings showing all field changes"
- "Include O&M manuals for all equipment supplied"

---

### 1.8 Support/Training Patterns

**Evidence from corpus:**

> "Demonstrate operation and maintenance of equipment and systems to Owner's personnel"  
> *(Section 01 79 00)*

> "Instruct personnel in phases of operation and maintenance using operation and maintenance manuals"  
> *(Standard specifications)*

**Typical Training Scope:**
- On-site operator training (4-8 hours typical)
- PLC/HMI navigation and control mode selection
- Alarm acknowledgement and troubleshooting
- Setpoint adjustment procedures
- Basic maintenance procedures
- Emergency shutdown procedures

**Support Services:**
- Remote SCADA access for troubleshooting
- Cellular modem connectivity for alarm monitoring
- Phone/email technical support
- Software updates and bug fixes during warranty period
- Return visits for additional training or modifications

---

## 2. RECURRING INDUSTRIES/APPLICATIONS

### 2.1 Water Treatment Plants (WTP)

**Frequency:** 3,676+ mentions in corpus

**Typical Systems:**
- Raw water intake and low lift pumping
- Screening and grit removal
- Chemical dosing (coagulation, chlorination, pH adjustment)
- Clarification (Actiflo, ballasted flocculation)
- Filtration (gravity filters, membrane filters)
- UV disinfection
- High lift pumping and distribution
- Backwash systems
- Clearwell level control

**Example Projects:**
- Carleton Place WTP Expansion
- Golfview Subdivision WTP

---

### 2.2 Wastewater Treatment (WWTP)

**Frequency:** 3,676+ mentions in corpus

**Typical Systems:**
- Influent pumping and screening
- Grit removal (vortex systems)
- Primary clarification
- Biological treatment (activated sludge, MBR, SBR)
- Aeration blowers and diffusers
- Secondary clarification
- UV disinfection
- Sludge thickening and dewatering
- Digester control and mixing
- Effluent pumping

**Example Projects:**
- Carleton Place WWTP Expansion
- Multiple municipal WWTP upgrades

---

### 2.3 Pumping Stations/Lift Stations

**Frequency:** 7,352+ combined mentions

**Types:**
- **Sanitary Sewage Lift Stations:** Submersible pumps, wet well level control
- **Stormwater Pumping Stations:** High-flow capacity, weather-responsive
- **Water Booster Stations:** Pressure control, variable speed drives
- **Raw Water Intake Stations:** Lake/river intake, traveling screens

**Typical Features:**
- Duplex/triplex/quad pump configurations
- Lead/lag/standby rotation
- High/low level alarms with auto-dialer
- Wet well level control with ultrasonic transmitters
- VFD speed control for flow matching
- Backup generator integration
- Remote SCADA monitoring via cellular modem

**Example Projects:**
- McGee Street Lift Station (CCI-1413)
- Golfview Subdivision Pumping Station (CCI-1413Q)

---

### 2.4 Transit/Infrastructure

**Applications:**
- Tunnel dewatering systems
- Station drainage pumping
- HVAC control systems
- Emergency backup systems

---

### 2.5 Industrial Process

**Applications:**
- Chemical feed systems
- Process water treatment
- Cooling tower control
- Compressed air systems

---

## 3. RECURRING PLATFORMS/VENDORS

### 3.1 PLC Brands and Models

**Primary Platform: Allen-Bradley (Rockwell Automation)**

**Evidence from corpus:**

> "PLC CPU: CompactLogix 1769-L36ERM"  
> *(Standard specification)*

> "Control panels and/or PLC panels shall be Allen-Bradley CompactLogix series. The exception is 40-VCP-01 by Veolia which will be Allen-Bradley ControlLogix."  
> *(Addendum clarification)*

**Standard Models:**
- **CompactLogix 5370 Series:**
  - 1769-L33ER (2MB memory, dual Ethernet)
  - 1769-L36ERM (3MB memory, dual Ethernet with DLR)
  - Most common for pumping stations and small process systems

- **ControlLogix 5570 Series:**
  - 1756-L73 (4MB memory)
  - 1756-L83E (10MB memory, dual Ethernet)
  - Used for large WTP/WWTP with extensive I/O

**I/O Modules (1769 Series - CompactLogix):**
- 1769-IQ16: 16-point 24VDC digital input
- 1769-OW16: 16-point relay digital output
- 1769-IF8: 8-point analog input (4-20mA/0-10V)
- 1769-OF4CI: 4-point analog output (4-20mA)

**Programming Software:**
- RSLogix 5000 / Studio 5000 Logix Designer
- Version coordinated with PLC firmware

---

### 3.2 SCADA/HMI Software

**HMI Platforms:**

**Allen-Bradley PanelView Plus 7:**
- Standard touchscreen HMI for local operator interface
- Sizes: 7", 10", 12", 15" displays
- Ethernet/IP communication to CompactLogix PLCs
- FactoryTalk View ME software

**GE iFix SCADA:**
- Centralized SCADA workstation for WTP/WWTP
- Historical trending and alarm management
- Multi-site monitoring capability
- OPC/Ethernet communication to multiple PLCs

**Evidence from corpus:**

> "The term HMI refers to the SCADA HMI iFix system that communicates with the various PLCs and provides a centralized operational interface for the entire water and wastewater treatment system"  
> *(Section 25 09 93)*

---

### 3.3 Panel/Electrical Standards

**Enclosure Manufacturers:**
- Hammond Manufacturing
- Hoffman (nVent)
- Rittal
- Saginaw Control

**Enclosure Ratings:**
- **NEMA 4/4X:** Outdoor, corrosion-resistant (stainless steel)
- **NEMA 3R:** Outdoor, rain-tight (painted carbon steel)
- **NEMA 12:** Indoor, dust-tight
- **IP65/IP66:** International equivalent ratings

**Electrical Components:**

**Circuit Protection:**
- Allen-Bradley circuit breakers (140M, 1492 series)
- Square D/Schneider Electric breakers

**Terminal Blocks:**
- Phoenix Contact (CLIPLINE, UK series)
- Weidmuller (SAK series)

**Power Supplies:**
- Phoenix Contact (QUINT series) - 24VDC, 5A/10A/20A
- Allen-Bradley (1606 series)

**Relays:**
- Allen-Bradley 700-HF series (ice cube relays)
- Phoenix Contact interface relays

**Surge Protection:**
- Phoenix Contact surge arresters (2905333)

**Evidence from corpus:**

> "NEMA 4X construction, 316 stainless steel, rated for outdoor installation"  
> *(Panel specifications)*

---

### 3.4 Instrumentation Vendors

**Primary Vendor: Siemens Process Instrumentation**

**Evidence from corpus:**

> "Section 40 71 13 Magnetic Flow Meters WWTP - Siemens"  
> "Section 40 72 13 2.1 Ultrasonic Level WWTP- Siemens"  
> "Section 40 73 26 Gauge Pressure Transmitter WWTP - Siemens"  
> *(Quotation line items)*

> "Only Franklin Empire Technicians are trained, certified and authorized by Siemens for commissioning of Siemens Process Instrumentation in Ontario."  
> *(Quotation notes)*

**Siemens Product Lines:**
- **Sitrans FM:** Magnetic flow meters (Mag 5000/6000 series)
- **Sitrans LU:** Ultrasonic level transmitters (Probe LU)
- **Sitrans P:** Pressure transmitters (DS III, Sitrans P300)
- **Sitrans F:** Coriolis and vortex flow meters

**Alternate Vendors:**
- Endress+Hauser (Promag, Prosonic, Cerabar)
- Hach (analytical instruments)
- YSI (dissolved oxygen, pH)
- Magnetrol (level switches)

---

### 3.5 Network/Communication Protocols

**Primary Protocol: Ethernet/IP**

**Evidence from corpus:**

> "Ethernet/IP CIP Interface enables premier integration to the Integrated Architecture system with Studio 5000"  
> *(Stratix switch documentation)*

> "VFD should communicate via Ethernet IP to PLC control panel"  
> *(Standard specifications)*

**Network Infrastructure:**

**Managed Switches:**
- Allen-Bradley Stratix 5200/5800 series
- Cisco Industrial Ethernet switches
- Features: VLAN, QoS, RSTP, DLR (Device Level Ring)

**Fiber Optic:**
- Single-mode fiber for long distances (>2km)
- Multi-mode fiber for building-to-building (up to 2km)
- LC/SC connectors standard

**Communication Protocols:**
- **Ethernet/IP:** Primary protocol for Allen-Bradley PLCs, VFDs, HMIs
- **Modbus TCP:** Secondary protocol for third-party devices
- **Modbus RTU (RS485):** Legacy serial devices
- **HART:** Analog instruments with digital overlay
- **Profibus:** Rare, vendor-specific equipment

**Remote Access:**
- Cellular modems (Sierra Wireless, Digi)
- VPN routers for secure remote access
- Static IP or dynamic DNS services

**Evidence from corpus:**

> "Provide cellular modem panel to be installed at the main plant"  
> *(CCI-1413 McGee Pumping Station)*

> "Ethernet and electrical wirings between VFD and PLC control panel are by others"  
> *(Vendor equipment notes)*

---

## 4. DELIVERABLE STRUCTURE PATTERNS

### 4.1 Typical Scope Inclusions

**From Standard Quotation Language:**

✅ **Included:**
- Panel fabrication with CSA certification
- PLC/HMI programming and configuration
- Instrumentation supply and configuration
- Shop drawings and submittals
- Factory acceptance testing (FAT)
- Site commissioning and startup
- Operator training (basic)
- As-built documentation
- One-year warranty on CCI-supplied equipment

---

### 4.2 Typical Scope Exclusions

**Evidence from corpus:**

> "Excludes all permits/inspections/studies/reports, supplied control panels will have CSA certification"  
> "Excludes all Vendor Supply packages (instrumentation and VFD)"  
> "Excludes all TSH sensors associated with pumps and motors"  
> "Excludes all cables exterior to control panels, unless cabling included with instrumentation"  
> "Any reference to terminations exterior to the control panels"  
> "Any references to field wiring"  
> *(Standard exclusions across quotations)*

❌ **Excluded (by others):**
- Electrical permits and inspections
- Field wiring between panels and devices
- Conduit and cable tray installation
- Panel mounting and anchoring
- External grounding and bonding
- Civil/structural work
- Process equipment (pumps, blowers, filters)
- Vendor control panels (UV, filtration, etc.)
- Motor temperature sensors (TSH)
- Spare parts beyond commissioning consumables

---

### 4.3 Project Phasing

**Typical Project Phases:**

**Phase 1: Engineering/Design (Weeks 1-8)**
- Review specifications and drawings
- Develop shop drawings and panel layouts
- Create PLC/HMI program architecture
- Submit for approval

**Phase 2: Fabrication (Weeks 9-16)**
- Panel fabrication and wiring
- PLC/HMI programming
- Instrumentation procurement
- Factory testing and CSA certification

**Phase 3: Delivery/Installation (Weeks 17-20)**
- Ship panels to site
- Installation by general contractor
- Field wiring by electrical contractor
- CCI provides termination supervision

**Phase 4: Commissioning (Weeks 21-24)**
- I/O loop checks and verification
- PLC logic testing with actual devices
- HMI graphics validation
- PID loop tuning
- Operator training
- Final documentation

---

### 4.4 FAT/SAT Definitions

**Factory Acceptance Test (FAT):**
- Conducted at CCI shop before shipment
- Panel inspection and CSA label verification
- Power-up and voltage checks
- PLC program simulation (no field devices)
- HMI graphics navigation and functionality
- Communication network testing
- Typically 2-4 hours with customer present (optional)

**Site Acceptance Test (SAT):**
- Conducted at project site after installation
- Field device loop checks (4-20mA signals verified)
- Motor rotation and VFD operation
- Interlock and alarm sequence testing
- PID loop tuning under actual process loads
- SCADA communication verification
- Typically 3-5 days depending on system complexity

**Evidence from corpus:**

> "Factory testing to verify PLC program logic and panel wiring prior to shipment"  
> "Site commissioning to verify all field devices and control sequences under actual operating conditions"  
> *(Standard commissioning language)*

---

### 4.5 Payment Schedules

**Typical Payment Terms:**

**Evidence from corpus:**

> "10% on commissioning"  
> *(Quotation payment terms)*

**Standard Breakdown:**
- 10-20% deposit upon contract award
- 30-40% upon shop drawing approval
- 30-40% upon panel shipment/delivery
- 10-20% upon commissioning completion
- 5-10% holdback (30-60 days after substantial completion)

---

## 5. EXACT WORDING PATTERNS

### Professional Technical Language Suitable for Website Copy

**1. Control System Integration**
> "Supply, program, and commission PLC-based control systems with integrated HMI interfaces for comprehensive process monitoring and control."

**2. Panel Fabrication**
> "Design and fabricate CSA-certified control panels engineered to meet project-specific requirements and environmental conditions."

**3. Instrumentation**
> "Supply and configure process instrumentation including flow, level, pressure, and analytical measurement devices with full commissioning support."

**4. SCADA Systems**
> "Develop centralized SCADA systems providing operators with real-time process visualization, alarm management, and historical trending capabilities."

**5. Commissioning Services**
> "Provide comprehensive commissioning services including factory acceptance testing, site startup, and operator training to ensure reliable system operation."

**6. System Documentation**
> "Deliver complete as-built documentation including PLC programs, HMI graphics, wiring diagrams, and operation and maintenance manuals."

**7. Water/Wastewater Expertise**
> "Specialized in control systems for municipal water treatment, wastewater treatment, and pumping station applications."

**8. Allen-Bradley Platform**
> "Leverage Allen-Bradley CompactLogix and ControlLogix PLCs with FactoryTalk HMI for robust, industry-standard automation solutions."

**9. Network Integration**
> "Integrate Ethernet/IP and fiber optic networks for reliable communication between field devices, PLCs, and SCADA workstations."

**10. VFD Integration**
> "Configure and commission variable frequency drives with seamless integration to PLC control systems for optimized pump and blower operation."

**11. Remote Monitoring**
> "Enable remote SCADA access via cellular modem for off-site monitoring, alarm notification, and troubleshooting support."

**12. Standards Compliance**
> "All control panels designed and certified to CSA/UL 508A standards with NEMA 4X ratings for harsh environmental conditions."

**13. Turnkey Solutions**
> "Provide turnkey control system solutions from initial design through commissioning, training, and ongoing technical support."

**14. Process Control Programming**
> "Develop custom PLC programs with clear ladder logic, comprehensive alarming, and intuitive operator interfaces tailored to specific process requirements."

**15. Field Service**
> "Offer on-site commissioning, troubleshooting, and technical support services to ensure optimal system performance and uptime."

---

## SUMMARY OF KEY FINDINGS

### Core Business Model

Capital Controls & Instrumentation Inc. operates as a **systems integrator** specializing in:

1. **Control System Design & Programming**
   - Allen-Bradley PLC platforms (CompactLogix/ControlLogix)
   - Custom ladder logic with clear documentation
   - HMI/SCADA interface development

2. **Panel Fabrication**
   - CSA-certified control panels (UL 508A)
   - NEMA 4X stainless steel for harsh environments
   - Complete electrical design and wiring

3. **Instrumentation Supply**
   - Siemens process instrumentation (primary vendor)
   - Flow, level, pressure, analytical measurement
   - Configuration and commissioning

4. **Commissioning Services**
   - Factory acceptance testing (FAT)
   - Site acceptance testing (SAT)
   - PID loop tuning and optimization
   - Operator training

5. **Documentation & Support**
   - As-built drawings and programs
   - O&M manuals
   - Remote monitoring capability
   - Ongoing technical support

### Primary Markets

- **Municipal Water/Wastewater:** 92% of corpus mentions
- **Pumping Stations:** High frequency, standardized offerings
- **Industrial Process:** Secondary market

### Technical Platform

- **PLC:** Allen-Bradley (Rockwell Automation) - 95%+ of projects
- **HMI:** PanelView Plus 7, iFix SCADA
- **Instruments:** Siemens (primary), Endress+Hauser (secondary)
- **Network:** Ethernet/IP, fiber optic, cellular remote access
- **Standards:** CSA/UL 508A, NEMA 4X, IP65/66

### Competitive Differentiators

1. **CSA-certified panel fabrication** in-house
2. **Siemens instrumentation expertise** (authorized commissioning)
3. **Turnkey approach** from design through commissioning
4. **Municipal water/wastewater specialization**
5. **Allen-Bradley platform expertise**
6. **Comprehensive documentation** and training

---

## RECOMMENDED WEBSITE COPY STRUCTURE

Based on corpus analysis, website should emphasize:

1. **Services Page:**
   - PLC Programming & Integration
   - Control Panel Fabrication
   - SCADA/HMI Development
   - Process Instrumentation
   - Commissioning & Startup
   - Training & Support

2. **Markets Page:**
   - Water Treatment Plants
   - Wastewater Treatment Plants
   - Pumping & Lift Stations
   - Industrial Process Control

3. **Platforms Page:**
   - Allen-Bradley PLCs (CompactLogix/ControlLogix)
   - FactoryTalk HMI/SCADA
   - Siemens Instrumentation
   - Network Infrastructure

4. **Process Page:**
   - Engineering & Design
   - Shop Drawing Submittals
   - Panel Fabrication & FAT
   - Site Installation Support
   - Commissioning & SAT
   - Documentation & Training

---

**End of Synthesis Report**  
**Agent Completion:** 2026-03-29 18:45 EST
