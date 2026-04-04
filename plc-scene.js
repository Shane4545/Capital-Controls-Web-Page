/**
 * Homepage flagship: representative industrial control narrative — constrained camera, no OrbitControls.
 * Control-style chassis, Studio 5000–style ladder (generic), SCADA/HMI overview (generic).
 * Three loaded dynamically via import map → ./vendor/three/build/three.module.js
 */

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function drawLadderRungRow(ctx, w, y0, rungIdx, lineH, activeRung, t) {
  const left = 72;
  const right = w - 72;
  const midY = y0 + lineH * 0.52;
  const active = rungIdx === activeRung;
  const pulse = active ? 0.08 * Math.sin(t * 6) : 0;

  if (active) {
    ctx.fillStyle = "rgba(34, 197, 94, 0.14)";
    ctx.fillRect(left - 8, y0, right - left + 16, lineH);
  }

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 13px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText(String(rungIdx), left - 44, midY + 5);

  ctx.strokeStyle = active ? `rgba(74, 222, 128, ${0.75 + pulse})` : "#475569";
  ctx.lineWidth = active ? 3.2 : 2;
  ctx.beginPath();
  ctx.moveTo(left, midY);
  ctx.lineTo(right - 220, midY);
  ctx.stroke();
}

function drawNOContact(ctx, cx, cy, active) {
  ctx.strokeStyle = active ? "#4ade80" : "#64748b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy - 14);
  ctx.lineTo(cx - 5, cy + 14);
  ctx.moveTo(cx + 5, cy - 14);
  ctx.lineTo(cx + 5, cy + 14);
  ctx.stroke();
}

function drawNCContact(ctx, cx, cy, active) {
  ctx.strokeStyle = active ? "#4ade80" : "#64748b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy - 14);
  ctx.lineTo(cx - 5, cy + 14);
  ctx.moveTo(cx + 5, cy - 14);
  ctx.lineTo(cx + 5, cy + 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy - 14);
  ctx.lineTo(cx + 7, cy + 12);
  ctx.stroke();
}

function drawCoil(ctx, cx, cy, active) {
  ctx.strokeStyle = active ? "#4ade80" : "#64748b";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLadderCanvas(ctx, w, h, activeRung, t) {
  ctx.fillStyle = "#1b2434";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(56, 64);
  ctx.lineTo(56, h - 64);
  ctx.moveTo(w - 56, 64);
  ctx.lineTo(w - 56, h - 64);
  ctx.stroke();

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 18px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("ROUTINE  PMP_BOOST_INTERLOCK  ·  MainProgram", 72, 46);
  ctx.fillStyle = "#64748b";
  ctx.font = "500 13px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("Representative pump permissive / interlock — illustration only", 72, 72);

  const lineH = Math.floor((h - 200) / 7);
  let y = 108;
  const rungSpecs = [
    { tag: "(* Booster permissives — discharge pressure, tank level, HOA *)", comment: true },
    {
      parts: [
        { type: "no", label: "TankLevel_OK" },
        { type: "nc", label: "DischPress_HI" },
        { type: "no", label: "HOA_AUTO" },
        { type: "coil", label: "Permissive_OK" },
      ],
    },
    {
      parts: [
        { type: "no", label: "Permissive_OK" },
        { type: "no", label: "PumpStart_PB" },
        { type: "coil", label: "Pump_Start_Seal" },
      ],
    },
    {
      parts: [
        { type: "no", label: "Pump_Start_Seal" },
        { type: "no", label: "Motor_FB" },
        { type: "coil", label: "Pump_Run_Latch" },
      ],
    },
    {
      parts: [
        { type: "nc", label: "Stop_PB" },
        { type: "nc", label: "VFD_Fault" },
        { type: "coil", label: "Pump_Run_Latch" },
      ],
    },
    { tag: "(* Output mapping to rack & field devices *)", comment: true },
  ];

  let rungNum = 0;
  for (let ri = 0; ri < rungSpecs.length; ri++) {
    const spec = rungSpecs[ri];
    if (spec.comment) {
      ctx.fillStyle = "#64748b";
      ctx.font = "italic 500 14px IBM Plex Mono, ui-monospace, monospace";
      ctx.fillText(spec.tag, 80, y + lineH * 0.55);
      y += lineH;
      continue;
    }
    const active = rungNum === activeRung;
    drawLadderRungRow(ctx, w, y, rungNum, lineH, activeRung, t);

    const midY = y + lineH * 0.52;
    let x = 140;
    const gap = 150;

    ctx.fillStyle = active ? "#bbf7d0" : "#94a3b8";
    ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";

    for (const p of spec.parts) {
      if (p.type === "no") {
        drawNOContact(ctx, x, midY, active);
        ctx.fillText(p.label, x - 48, midY - 26);
        x += gap;
      } else if (p.type === "nc") {
        drawNCContact(ctx, x, midY, active);
        ctx.fillText(p.label, x - 52, midY - 26);
        x += gap;
      } else if (p.type === "coil") {
        drawCoil(ctx, x, midY, active);
        ctx.fillText(p.label, x - 56, midY - 26);
        x += gap + 20;
      }
    }

    y += lineH;
    rungNum++;
  }

  ctx.fillStyle = "#475569";
  ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("Studio 5000 / Logix Designer style — illustration only", 72, h - 28);
}

/** Silhouette: vertical PLC rack / ControlLogix-class chassis (generic, not a product model). */
function buildRack(THREE) {
  const g = new THREE.Group();
  const chassisGray = new THREE.MeshStandardMaterial({
    color: 0x6b7788,
    metalness: 0.42,
    roughness: 0.4,
  });
  const recess = new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    metalness: 0.48,
    roughness: 0.46,
  });
  const ioFace = new THREE.MeshStandardMaterial({
    color: 0x8e99ab,
    metalness: 0.32,
    roughness: 0.44,
  });
  const portDark = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    metalness: 0.22,
    roughness: 0.52,
  });
  const terminalStrip = new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    metalness: 0.45,
    roughness: 0.42,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.11, 0.48), recess);
  base.position.set(0, -1.36, 0);
  base.castShadow = true;
  g.add(base);

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.62, 0.44), chassisGray);
  chassis.position.set(0, 0.02, 0);
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  g.add(chassis);

  const back = new THREE.Mesh(new THREE.BoxGeometry(0.74, 2.58, 0.04), recess);
  back.position.set(0, 0.02, -0.22);
  g.add(back);

  for (const rx of [-0.35, 0.35]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.038, 2.54, 0.038), recess);
    rail.position.set(rx, 0.02, -0.14);
    g.add(rail);
  }

  const psu = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.4, 0.34), recess);
  psu.position.set(0, -1.02, 0.06);
  psu.castShadow = true;
  g.add(psu);
  for (let v = 0; v < 8; v++) {
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.01, 0.02), portDark);
    slit.position.set(0, -1.14 + v * 0.042, 0.21);
    g.add(slit);
  }

  const cpu = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.48, 0.32), ioFace);
  cpu.position.set(0, -0.4, 0.06);
  cpu.castShadow = true;
  g.add(cpu);
  const key = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.11, 0.02), portDark);
  key.position.set(-0.2, -0.3, 0.22);
  g.add(key);
  for (let e = 0; e < 3; e++) {
    const eth = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.035), portDark);
    eth.position.set(-0.04 + e * 0.095, -0.44, 0.22);
    g.add(eth);
  }

  const leds = [];
  const ledCpuMat = new THREE.MeshStandardMaterial({
    color: 0x2c3c34,
    emissive: 0x000000,
    emissiveIntensity: 0,
  });
  const ledCpu = new THREE.Mesh(new THREE.SphereGeometry(0.017, 10, 10), ledCpuMat);
  ledCpu.position.set(0.22, -0.36, 0.2);
  g.add(ledCpu);
  leds.push(ledCpu);

  const ioYs = [0.14, 0.54, 0.94, 1.34];
  ioYs.forEach((y) => {
    const mod = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.34, 0.3), ioFace);
    mod.position.set(0, y, 0.05);
    mod.castShadow = true;
    g.add(mod);
    const tb = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.055, 0.02), terminalStrip);
    tb.position.set(0, y - 0.11, 0.21);
    g.add(tb);
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0x2c3c34, emissive: 0x000000, emissiveIntensity: 0 })
    );
    led.position.set(0.27, y + 0.05, 0.2);
    g.add(led);
    leds.push(led);
  });

  const cableMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.88 });
  const powerCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.12, -1.3, 0.22),
    new THREE.Vector3(-0.42, -1.52, 0.55),
    new THREE.Vector3(-0.88, -1.58, 0.82),
  ]);
  const cable = new THREE.Mesh(new THREE.TubeGeometry(powerCurve, 28, 0.022, 8, false), cableMat);
  cable.castShadow = true;
  g.add(cable);

  return { group: g, leds };
}

function buildLadderPanel(THREE, ladderTex) {
  const grp = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x5a6a7e,
    metalness: 0.72,
    roughness: 0.24,
  });
  const w = 1.95;
  const h = 1.22;
  const t = 0.04;
  const f = [
    [0, h / 2 + t / 2, w + t * 2, t],
    [0, -h / 2 - t / 2, w + t * 2, t],
    [-w / 2 - t / 2, 0, t, h + t * 2],
    [w / 2 + t / 2, 0, t, h + t * 2],
  ];
  for (const [px, py, fw, fh] of f) {
    const piece = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.06), frameMat);
    piece.position.set(px, py, -0.02);
    piece.castShadow = true;
    grp.add(piece);
  }

  const glassMat = new THREE.MeshPhysicalMaterial({
    map: ladderTex,
    transparent: true,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.08,
    thickness: 0.4,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    emissive: 0x182028,
    emissiveIntensity: 0.05,
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glassMat);
  panel.position.z = 0.04;
  grp.add(panel);

  const backGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.98, h * 0.98),
    new THREE.MeshBasicMaterial({ color: 0x2a3548, transparent: true, opacity: 0.28 })
  );
  backGlow.position.z = -0.02;
  grp.add(backGlow);

  return grp;
}

/** Representative booster station SCADA / HMI overview (generic graphics, not a live display). */
function drawScadaCanvas(ctx, w, h, t) {
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, w, 56);
  ctx.strokeStyle = "#334155";
  ctx.strokeRect(0.5, 0.5, w - 1, 55);
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "600 17px IBM Plex Sans, system-ui, sans-serif";
  ctx.fillText("BOOSTER STATION — SCADA OVERVIEW", 20, 36);

  ctx.fillStyle = "rgba(239, 68, 68, 0.18)";
  ctx.fillRect(12, 60, w - 24, 22);
  ctx.fillStyle = "#fca5a5";
  ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("ALM: none active (illustration only)", 20, 76);

  const py = 100;
  const tankX = Math.min(140, w * 0.08);
  const tankW = 110;
  const tankH = Math.min(200, h - py - 72);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 3;
  ctx.strokeRect(tankX, py, tankW, tankH);
  const level = 0.52 + 0.1 * Math.sin(t * 0.85);
  ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
  ctx.fillRect(tankX + 5, py + 5 + tankH * (1 - level), tankW - 10, tankH * level - 10);
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "500 11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("WET WELL", tankX + 8, py + 22);
  ctx.fillText(`LEVEL ${(64 + level * 14).toFixed(1)} %`, tankX + 8, py + tankH - 10);

  function drawPump(cx, cy, run, label) {
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, Math.PI * 2);
    ctx.strokeStyle = run ? "#22c55e" : "#64748b";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = run ? "#86efac" : "#475569";
    ctx.font = "600 13px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText("M", cx - 6, cy + 6);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "500 10px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText(label, cx - 28, cy + 52);
  }

  const runA = Math.sin(t * 1.05) > 0;
  const pump1X = tankX + tankW + 140;
  const pump2X = pump1X + 160;
  const pumpY = py + tankH * 0.45;
  drawPump(pump1X, pumpY, runA, "P-101A");
  drawPump(pump2X, pumpY, !runA, "P-101B");

  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(tankX + tankW, py + 55);
  ctx.lineTo(pump1X - 34, py + 55);
  ctx.lineTo(pump1X, pumpY - 34);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tankX + tankW, py + 120);
  ctx.lineTo(pump2X - 34, py + 115);
  ctx.lineTo(pump2X, pumpY - 34);
  ctx.stroke();

  const bx = Math.max(pump2X + 80, w - 270);
  ctx.fillStyle = "#334155";
  ctx.fillRect(bx, py, 250, Math.min(210, h - py - 48));
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("DISCHARGE PRESS", bx + 14, py + 28);
  const press = 42 + 7 * Math.sin(t * 0.65);
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(bx + 14, py + 38, Math.min(216, Math.max(24, press * 3.8)), 14);
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "500 13px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText(`${press.toFixed(1)} PSI`, bx + 14, py + 78);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("FLOW (MAG METER)", bx + 14, py + 108);
  const flow = 820 + 55 * Math.sin(t * 1.15);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText(`${flow.toFixed(0)} GPM`, bx + 14, py + 132);

  ctx.fillStyle = "#64748b";
  ctx.font = "500 11px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("SCADA / HMI — representative graphics only", 20, h - 14);
}

/** Wall-mount operator display for SCADA texture. */
function buildScadaPanel(THREE, scadaTex) {
  const grp = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x374151,
    metalness: 0.55,
    roughness: 0.35,
  });
  const w = 1.82;
  const h = 1.02;
  const t = 0.035;
  const f = [
    [0, h / 2 + t / 2, w + t * 2, t],
    [0, -h / 2 - t / 2, w + t * 2, t],
    [-w / 2 - t / 2, 0, t, h + t * 2],
    [w / 2 + t / 2, 0, t, h + t * 2],
  ];
  for (const [px, py, fw, fh] of f) {
    const piece = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.05), frameMat);
    piece.position.set(px, py, -0.02);
    piece.castShadow = true;
    grp.add(piece);
  }
  const screenMat = new THREE.MeshPhysicalMaterial({
    map: scadaTex,
    roughness: 0.18,
    metalness: 0.06,
    emissive: 0x0c1018,
    emissiveIntensity: 0.06,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMat);
  screen.position.z = 0.04;
  grp.add(screen);
  return grp;
}

function buildLinkTubes(THREE, p0, p1, p2) {
  const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6b7280,
    emissive: 0x111820,
    emissiveIntensity: 0.06,
    metalness: 0.25,
    roughness: 0.55,
    transparent: true,
    opacity: 0.82,
  });
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.014, 6, false), mat);
  mesh.castShadow = true;
  return mesh;
}

async function initPlcFlagship() {
  const host = document.getElementById("plc-engine-host");
  const canvas = document.getElementById("plc-engine-canvas");
  const fallback = document.getElementById("plc-engine-fallback");
  if (!host || !canvas || !fallback) return;

  const showFallback = () => {
    canvas.classList.add("home-flagship-scene__canvas--hidden");
    fallback.removeAttribute("hidden");
    host.classList.add("home-flagship-scene__viewport--fallback");
  };

  if (!hasWebGL()) {
    showFallback();
    return;
  }

  let THREE;
  try {
    THREE = await import("three");
  } catch {
    showFallback();
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6b8299);
  scene.fog = null;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.12, 120);
  const targetBase = new THREE.Vector3(0.12, 0.42, 0);
  const eyeBase = new THREE.Vector3(-0.85, 1.38, 7.35);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
  } catch {
    showFallback();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.72;

  const amb = new THREE.AmbientLight(0xb8c4d4, prefersReducedMotion ? 0.72 : 0.68);
  scene.add(amb);
  const key = new THREE.DirectionalLight(0xffffff, 1.85);
  key.position.set(4.2, 8.5, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 22;
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.bias = -0.00025;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd8e4f4, 0.58);
  fill.position.set(-3, 3, -2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x7dffb3, prefersReducedMotion ? 0 : 0.18);
  rim.position.set(-2, 1.5, -4);
  scene.add(rim);

  const stage = new THREE.Group();
  scene.add(stage);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4040, 40),
    new THREE.MeshStandardMaterial({ color: 0x3d4a5a, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.66;
  ground.receiveShadow = true;
  stage.add(ground);

  const rackData = buildRack(THREE);
  const rack = rackData.group;
  rack.position.set(-3.25, 0.05, -0.25);
  rack.rotation.y = 0.08;
  stage.add(rack);

  const lcvs = document.createElement("canvas");
  lcvs.width = 2048;
  lcvs.height = 1280;
  const lctx = lcvs.getContext("2d");
  const ladderTex = new THREE.CanvasTexture(lcvs);
  ladderTex.colorSpace = THREE.SRGBColorSpace;
  ladderTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const ladder = buildLadderPanel(THREE, ladderTex);
  ladder.position.set(0.15, 0.28, 0.65);
  ladder.rotation.y = -0.06;
  stage.add(ladder);

  const scvs = document.createElement("canvas");
  scvs.width = 1600;
  scvs.height = 900;
  const sctx = scvs.getContext("2d");
  const scadaTex = new THREE.CanvasTexture(scvs);
  scadaTex.colorSpace = THREE.SRGBColorSpace;
  scadaTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scada = buildScadaPanel(THREE, scadaTex);
  scada.position.set(3.05, 0.32, -0.18);
  scada.rotation.y = -0.1;
  stage.add(scada);

  const pRack = new THREE.Vector3(-2.2, 0.35, 0.35);
  const pLadder = new THREE.Vector3(0.2, 0.45, 0.75);
  const pScada = new THREE.Vector3(2.32, 0.42, 0.28);
  stage.add(buildLinkTubes(THREE, pRack.clone(), pLadder.clone().lerp(pRack, 0.5), pLadder));
  stage.add(buildLinkTubes(THREE, pLadder.clone(), pScada.clone().lerp(pLadder, 0.45), pScada));

  stage.rotation.y = -0.04;

  let dragYaw = 0;
  let dragPitch = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  const MAX_Y = 0.11;
  const MAX_P = 0.07;
  let ptrX = 0;
  let ptrY = 0;

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointerup", (e) => {
    dragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  });
  canvas.addEventListener("pointermove", (e) => {
    const r = host.getBoundingClientRect();
    ptrX = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptrY = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    dragYaw = THREE.MathUtils.clamp(dragYaw + dx * 0.0009, -MAX_Y, MAX_Y);
    dragPitch = THREE.MathUtils.clamp(dragPitch - dy * 0.00075, -MAX_P, MAX_P);
  });

  const clock = new THREE.Clock();
  let rung = 0;
  const ladderRungCycle = 4;

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (w < 2 || h < 2) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!dragging && !prefersReducedMotion) {
      dragYaw *= 0.94;
      dragPitch *= 0.94;
    }

    const lookTarget = targetBase.clone().add(
      new THREE.Vector3(ptrX * 0.12, -ptrY * 0.07, ptrX * 0.04)
    );
    const offset = eyeBase.clone().sub(targetBase);
    const euler = new THREE.Euler(dragPitch, dragYaw + Math.sin(t * 0.09) * 0.012, 0, "YXZ");
    offset.applyEuler(euler);
    offset.add(
      new THREE.Vector3(Math.sin(t * 0.11) * 0.03, Math.sin(t * 0.13) * 0.015, Math.cos(t * 0.1) * 0.025)
    );
    camera.position.copy(lookTarget.clone().add(offset));
    camera.lookAt(lookTarget);

    if (!prefersReducedMotion) {
      rung = Math.floor((t * 0.45) % ladderRungCycle);
      drawLadderCanvas(lctx, lcvs.width, lcvs.height, rung, t);
      ladderTex.needsUpdate = true;
      drawScadaCanvas(sctx, scvs.width, scvs.height, t);
      scadaTex.needsUpdate = true;
      ladder.position.x = 0.15 + ptrX * 0.04;
      ladder.position.y = 0.28 + ptrY * 0.025;
      rack.position.x = -3.25 + ptrX * 0.02;
      scada.position.x = 3.05 - ptrX * 0.02;
      rackData.leds.forEach((led, i) => {
        const mat = led.material;
        const on = i === rung % rackData.leds.length;
        mat.emissive.setHex(on ? 0x00c964 : 0x000000);
        mat.emissiveIntensity = on ? 0.75 : 0;
      });
    } else {
      drawLadderCanvas(lctx, lcvs.width, lcvs.height, 1, 0);
      ladderTex.needsUpdate = true;
      drawScadaCanvas(sctx, scvs.width, scvs.height, 0);
      scadaTex.needsUpdate = true;
      rackData.leds.forEach((led, i) => {
        const mat = led.material;
        const on = i === 0;
        mat.emissive.setHex(on ? 0x00a651 : 0x000000);
        mat.emissiveIntensity = on ? 0.4 : 0;
      });
    }

    renderer.render(scene, camera);
  }

  animate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    void initPlcFlagship();
  });
} else {
  void initPlcFlagship();
}
