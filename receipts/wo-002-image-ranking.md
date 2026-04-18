# Work Order WO-002 — Image ranking (sales impact)

**Objective:** Rank all curated project photos by perceived sales and messaging impact so we can place strong images on the homepage hero, page headers, and primary sections, and demote or exclude weaker assets from the main visitor path.

**Source directory:** `c:\Cursor Projects\CCI Updare Web Page\assets\photos\`

**Note:** Tiers use filenames, on-site roles (current HTML), ALT descriptions, and listed file sizes. A visual pass on monitors is recommended before final hero picks.

---

## Ranked inventory (all 22 images)

| Filename | Tier | Rationale | Recommended usage |
|----------|------|-----------|-------------------|
| scada-killaloe-overview.png | A | Full municipal WTP SCADA overview reads immediately as "live operator-grade system"; already used as primary hero and social preview. | Homepage hero (primary); Markets / Services / Experience headers; retain for OG/Twitter where appropriate |
| scada-pembroke-mixer-pumps.png | A | Clear SCADA graphic tied to process equipment (mixer pumps)—strong "we run real plants" signal. | Homepage supporting hero strip; Platforms or Services sections; Experience gallery |
| scada-pembroke-alarms.png | A | Alarm display with instrument context shows commissioning/operations depth without looking like a stock photo. | Page headers (Services, Experience); homepage featured tile |
| panel-csa-shop-primary.jpg | A | CSA shop interior communicates build quality and organized execution—high trust for panel buyers. | Services page header/hero; Experience; About-adjacent credibility |
| panel-csa-shop-secondary.jpg | A | Second angle reinforces shop capability and repetition of quality. | Services; Experience; alternate header crop tests |
| drawing-bishop-panel.png | A | Legible electrical/panel drawing excerpt signals engineering and documentation strength. | Services (engineering/deliverables); Experience; proposal-style pages |
| panel.jpg | A | DIN rail / assembly drawing excerpt reads as precision and standards-aware design. | Platforms (documentation stack); Services; Experience |
| wtp-rockland-actiflo-panel.jpg | A | Named on-site process panel—clear subject, municipal context. | Markets (water/WTP); Experience case blocks |
| wtp-rockland-main-plc.jpg | A | Main PLC enclosure on site—clear integration story for municipal work. | Markets; Experience; technical hero alternate |
| hero-killaloe-wtp.jpg | A | Exterior/site WTP photography supports "real facilities" narrative for non-technical buyers. | Markets page header; Experience portfolio lead |
| gallery-killaloe-wtp-02.jpg | A | Dense control wiring/terminals demonstrates integration craftsmanship in a single frame. | Experience; Services "integration quality"; homepage mosaic |
| hmi-chalk-river-trends.png | B | On-trend HMI screen supports platforms story; **very small file size (~8 KB)** suggests limited resolution for full-width hero. | Platforms page (current role fits); secondary tiles—not primary homepage hero |
| hmi-chalk-river-alarm-summary.png | B | Useful HMI proof point; same **low file weight** concern for large displays. | Platforms; Experience supporting row |
| gallery-chalk-river-filters.jpg | B | Credible site work during integration; composition may be busier than a SCADA or shop hero. | Experience; Markets supporting section |
| field-chalk-river-upgrade.jpg | B | Field upgrade context is on-brand but **very large file (~2.5 MB)** for a generic "internals" shot—optimize before prominence. | Experience; technical deep-dive—not hero without edit |
| excel-cc-tools.png | B | Good for process/deliverables narrative; weaker as emotional "capability" hero for cold traffic. | Process page (already fits); Services footnote on tooling |
| brand-hero.jpg | B | **Tiny file (~8 KB)**—likely a narrow brand strip asset, not a cinematic hero backing plate. | Homepage brand strip / lockup area (current pattern)—not full-bleed hero |
| wtp-ingleside-field.jpg | C | ALT/describe pallet/shipment—reads as logistics snapshot; criteria explicitly deprioritize shipping/pallet shots. | Exclude from main path; internal/optional case appendix if ever needed |
| hero-installation.jpg | C | Described as quick field label reference in cramped environment—low narrative clarity for prospects. | Exclude or archive; do not use for headers |
| plc-scada-site.jpg | C | Legacy hardware close-up is documentation-heavy and easy to misread as "old tech" out of context. | Exclude from primary funnel; internal technical appendix only |
| field-work.jpg | C | Legacy enclosure internals—**large file**; generic subject competes poorly with SCADA/shop/WTP clarity. | Demote; optimize heavily if kept in long gallery |
| site-work-2.jpg | C | Board-level detail—cluttered for marketing; **large file** without broad appeal. | Exclude from hero pathway; demote to optional deep gallery |

---

## Recommended homepage hero

**Primary:** `scada-killaloe-overview.png` — best single-frame blend of municipal relevance, professional SCADA, and immediate "this is our work" recognition (consistent with current `index.html` hero and social tags at  
`c:\Cursor Projects\CCI Updare Web Page\index.html`).

**Strong alternates for A/B testing:** `scada-pembroke-mixer-pumps.png`, `panel-csa-shop-primary.jpg`, `hero-killaloe-wtp.jpg` (if the hero moment should emphasize facilities vs. screens).

---

## Recommended images by major page

| Page | Primary header / hero candidates | Supporting sections |
|------|----------------------------------|---------------------|
| **Services** | `panel-csa-shop-primary.jpg`, `drawing-bishop-panel.png` | `scada-killaloe-overview.png`, `gallery-killaloe-wtp-02.jpg`, `excel-cc-tools.png` |
| **Markets** | `hero-killaloe-wtp.jpg`, `scada-killaloe-overview.png` | `wtp-rockland-actiflo-panel.jpg`, `wtp-rockland-main-plc.jpg`, `gallery-chalk-river-filters.jpg` |
| **Platforms** | `hmi-chalk-river-trends.png` (with higher-res export if possible), `scada-killaloe-overview.png` | `scada-pembroke-alarms.png`, `panel.jpg`, `hmi-chalk-river-alarm-summary.png` |
| **Experience** | `scada-killaloe-overview.png` or `panel-csa-shop-primary.jpg` | Full set of A-tier project photos; B-tier for depth; omit C-tier from above-the-fold |

---

**Agent completion timestamp:** 2026-03-29  
**Work order status:** Analysis complete; receipt written to disk.
