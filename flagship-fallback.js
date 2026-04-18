/**
 * No-WebGL fallback: manifest + real photos + L5X-derived ladder JSON (same as WebGL pipeline).
 */
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function resolveAgainstPage(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch {
    return path;
  }
}

function formatLadderExtract(j) {
  if (!j?.rungs?.length) return "(Ladder extract unavailable)";
  const head = `${j.program || "Program"}.${j.routine || ""}\n${j.sourceProject || ""}\n${j.exportedFrom || j.sourceL5x || ""}\n\n`;
  const body = j.rungs
    .map((r) => `Rung ${r.number}: ${(r.text || "").replace(/\s+/g, " ").trim()}`)
    .join("\n");
  return head + body;
}

async function initFlagshipFallback() {
  const wrap = document.getElementById("plc-engine-fallback");
  const rackEl = document.getElementById("flagship-fallback-rack");
  const ladderPre = document.getElementById("flagship-fallback-ladder");
  const scadaEl = document.getElementById("flagship-fallback-scada");
  if (!wrap || !rackEl || !ladderPre || !scadaEl) return;

  try {
    const res = await fetch(new URL("assets/flagship/manifest.json", window.location.href));
    if (!res.ok) throw new Error(String(res.status));
    const manifest = await res.json();
    const a = manifest.assets || {};
    if (a.rackImage) {
      rackEl.src = resolveAgainstPage(a.rackImage);
      rackEl.alt = "PLC rack / field controller — project photo";
    }
    if (a.scadaImage) {
      scadaEl.src = resolveAgainstPage(a.scadaImage);
      scadaEl.alt = "SCADA / HMI display — project export";
    }
    const lex = a.ladderExtract || "assets/flagship/ladder-motor-control-main.json";
    try {
      const r2 = await fetch(resolveAgainstPage(lex));
      if (r2.ok) {
        const j = await r2.json();
        ladderPre.textContent = formatLadderExtract(j);
      } else {
        ladderPre.textContent = "Ladder extract not loaded — check " + lex;
      }
    } catch {
      ladderPre.textContent = "Ladder extract not loaded — check " + lex;
    }
  } catch {
    rackEl.removeAttribute("src");
    scadaEl.removeAttribute("src");
    ladderPre.textContent = "";
  }
}

if (!hasWebGL()) void initFlagshipFallback();
window.addEventListener("cci-flagship-fallback", () => {
  void initFlagshipFallback();
});
