/**
 * Homepage flagship: real engineering assets + state-driven animation.
 * Loads assets/flagship/manifest.json (paths, tag sequence). Self-hosted Three.js only.
 */
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DEFAULT_MANIFEST = {
  version: 2,
  assets: {
    rackImage: "assets/photos/flagship-rockland-plc-rack.jpg",
    scadaImage: "assets/photos/flagship-scada-glen-cairn-dws.png",
    processImage: "assets/photos/flagship-rockland-filter-process.jpg",
    ladderExtract: "assets/flagship/ladder-motor-control-main.json",
    ladderScreenshotFallback: null,
  },
  sequence: [
    {
      durationSec: 6,
      Pump1_Run: true,
      Pump2_Run: false,
      HighLevel: false,
      Comm_OK: true,
      AlarmActive: false,
      AutoMode: true,
      IO_Healthy: true,
      ladderHighlightRung: 0,
    },
  ],
};

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

function assetUrl(relativePath) {
  return new URL(relativePath, import.meta.url).href;
}

async function fetchManifest() {
  try {
    const res = await fetch(assetUrl("assets/flagship/manifest.json"));
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return DEFAULT_MANIFEST;
  }
}

function mergeManifest(raw) {
  return {
    ...DEFAULT_MANIFEST,
    ...raw,
    proof: raw.proof || null,
    assets: { ...DEFAULT_MANIFEST.assets, ...(raw.assets || {}) },
    sequence: Array.isArray(raw.sequence) && raw.sequence.length ? raw.sequence : DEFAULT_MANIFEST.sequence,
  };
}

async function fetchLadderExtract(relativePath) {
  try {
    const res = await fetch(assetUrl(relativePath || "assets/flagship/ladder-motor-control-main.json"));
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Deterministic state from manifest sequence — no decorative randomness. */
function sampleSequenceState(sequence, elapsedSec) {
  if (!sequence?.length) return { ...DEFAULT_MANIFEST.sequence[0] };
  let t = Math.max(0, elapsedSec);
  let i = 0;
  for (;;) {
    const step = sequence[i % sequence.length];
    const d = Math.max(0.1, Number(step.durationSec) || 4);
    if (t < d) return { ...step };
    t -= d;
    i++;
    if (i > sequence.length * 1000) return { ...sequence[0] };
  }
}

function loadTextureOptional(loader, urlHref) {
  return new Promise((resolve) => {
    if (!urlHref) {
      resolve(null);
      return;
    }
    loader.load(
      urlHref,
      (t) => resolve(t),
      undefined,
      () => resolve(null)
    );
  });
}

function buildPhotoPanel(THREE, tex, w, h, frameDepth) {
  const grp = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x2d3748,
    metalness: 0.35,
    roughness: 0.45,
  });
  const t = 0.038;
  const frames = [
    [0, h / 2 + t / 2, w + t * 2, t],
    [0, -h / 2 - t / 2, w + t * 2, t],
    [-w / 2 - t / 2, 0, t, h + t * 2],
    [w / 2 + t / 2, 0, t, h + t * 2],
  ];
  for (const [px, py, fw, fh] of frames) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, frameDepth), frameMat);
    m.position.set(px, py, -0.02);
    m.castShadow = true;
    grp.add(m);
  }
  const mat = new THREE.MeshStandardMaterial({
    map: tex || undefined,
    color: tex ? 0xffffff : 0x1e293b,
    roughness: 0.55,
    metalness: 0.08,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  plane.position.z = frameDepth * 0.5 + 0.01;
  grp.add(plane);
  return { group: grp, material: mat };
}

function buildCanvasPanel(THREE, cw, ch, composite) {
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const ctx = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const grp = new THREE.Group();
  const w = 1.92;
  const h = (ch / cw) * w;
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x4b5563,
    metalness: 0.5,
    roughness: 0.35,
  });
  const ft = 0.036;
  for (const [px, py, fw, fh] of [
    [0, h / 2 + ft / 2, w + ft * 2, ft],
    [0, -h / 2 - ft / 2, w + ft * 2, ft],
    [-w / 2 - ft / 2, 0, ft, h + ft * 2],
    [w / 2 + ft / 2, 0, ft, h + ft * 2],
  ]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.05), frameMat);
    m.position.set(px, py, -0.02);
    m.castShadow = true;
    grp.add(m);
  }
  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.22,
    metalness: 0.05,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  plane.position.z = 0.04;
  grp.add(plane);
  return {
    group: grp,
    canvas: c,
    ctx,
    texture: tex,
    width: w,
    height: h,
    redraw(state) {
      composite(ctx, cw, ch, state);
    },
  };
}

function wrapFill(ctx, text, x, y, maxW, lineH, maxLines) {
  const t = (text || "").replace(/\r\n/g, "\n").trim();
  if (!t) return y;
  const words = t.split(/\s+/);
  let line = "";
  let yy = y;
  let lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      yy += lineH;
      lines++;
      if (lines >= maxLines) return yy;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, yy);
    yy += lineH;
  }
  return yy;
}

/** Renders ladder text from L5X-derived JSON (real export), optional Studio screenshot inset. */
function ladderComposite(ctx, w, h, extract, screenshotImg, state) {
  ctx.fillStyle = "#0a0f18";
  ctx.fillRect(0, 0, w, h);

  const hi = Math.max(0, Number(state.ladderHighlightRung) || 0);
  const rungs = extract?.rungs;
  const title = extract
    ? `${extract.program || "Program"}.${extract.routine || "Routine"} — ${extract.sourceProject || ""}`
    : "Ladder extract missing — add assets/flagship/ladder-motor-control-main.json";
  const src = extract?.exportedFrom || extract?.sourceL5x || "";

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 17px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText(title.slice(0, 95), 24, 36);
  ctx.fillStyle = "#64748b";
  ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
  if (src) ctx.fillText(`Source: ${String(src).slice(0, 120)}`, 24, 58);
  ctx.fillText("Highlight = manifest ladderHighlightRung (tie-in to simulated scan)", 24, 76);

  if (screenshotImg) {
    const sw = Math.round(w * 0.38);
    const sh = Math.round(h * 0.34);
    ctx.globalAlpha = 0.42;
    ctx.drawImage(screenshotImg, w - sw - 16, 90, sw, sh);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(w - sw - 16, 90, sw, sh);
  }

  let y = 96;
  const rowPad = 14;
  const textW = screenshotImg ? w - Math.round(w * 0.38) - 48 : w - 48;

  if (!Array.isArray(rungs) || !rungs.length) {
    ctx.fillStyle = "#f87171";
    ctx.font = "600 14px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText("No rungs in extract — verify JSON beside L5X in assets/flagship/", 24, y + 40);
    return;
  }

  for (const r of rungs) {
    const n = Number(r.number);
    const isHi = n === hi;
    const rowTop = y;
    const blockH = 118;

    if (isHi) {
      ctx.fillStyle = "rgba(34, 197, 94, 0.2)";
      ctx.fillRect(8, rowTop - 4, w - 16, blockH);
      ctx.strokeStyle = "rgba(74, 222, 128, 0.95)";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(10, rowTop - 2, w - 20, blockH - 4);
    }

    ctx.fillStyle = isHi ? "#bbf7d0" : "#94a3b8";
    ctx.font = "700 13px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText(`Rung ${n}`, 24, rowTop + rowPad);

    ctx.fillStyle = isHi ? "#ecfdf5" : "#cbd5e1";
    ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
    let yy = rowTop + rowPad + 18;
    if (r.comment) {
      yy = wrapFill(ctx, r.comment, 88, yy, textW - 64, 15, 3);
    }
    ctx.fillStyle = isHi ? "#86efac" : "#4ade80";
    ctx.font = "600 12px IBM Plex Mono, ui-monospace, monospace";
    wrapFill(ctx, r.text || "", 24, yy + 4, w - 40, 16, 2);

    y += blockH;
    if (y > h - 40) break;
  }
}

/** Draw image into dw×dh like CSS object-fit: cover (no stretch). */
function drawImageCover(ctx, img, dx, dy, dw, dh) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const ir = iw / ih;
  const cr = dw / dh;
  let sx;
  let sy;
  let sw;
  let sh;
  if (ir > cr) {
    sh = ih;
    sw = sh * cr;
    sx = (iw - sw) / 2;
    sy = 0;
  } else {
    sw = iw;
    sh = sw / cr;
    sx = 0;
    sy = (ih - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function scadaComposite(ctx, w, h, baseImg, state, msgMissing) {
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, w, h);
  if (baseImg) {
    drawImageCover(ctx, baseImg, 0, 0, w, h);
  } else {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 14px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText("Add SCADA export:", 24, 40);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 14px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText(msgMissing || "assets/photos/scada-*.png (see manifest)", 24, 72);
  }
  if (state.AlarmActive) {
    ctx.strokeStyle = "rgba(248, 113, 113, 0.92)";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);
  }
  if (!state.Comm_OK) {
    ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
    ctx.fillRect(0, 0, w, 44);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "700 13px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText("COMM / NETWORK — CHECK (manifest-driven)", 16, 28);
  }
}

function buildEthernetTubes(THREE, p0, p1, p2) {
  const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6b7280,
    emissive: 0x111827,
    emissiveIntensity: 0.04,
    metalness: 0.2,
    roughness: 0.62,
    transparent: true,
    opacity: 0.88,
  });
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.018, 6, false), mat);
}

function buildProcessWetWell(THREE, processTex) {
  const g = new THREE.Group();
  if (processTex) {
    const backMat = new THREE.MeshStandardMaterial({
      map: processTex,
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0,
    });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 1.55), backMat);
    back.position.set(0.05, 0.12, -0.72);
    back.rotation.y = 0.04;
    g.add(back);
  }
  const steel = new THREE.MeshStandardMaterial({
    color: 0x5a6570,
    metalness: 0.5,
    roughness: 0.4,
  });
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.02,
    roughness: 0.3,
    transparent: true,
    opacity: 0.82,
  });
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.06, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.9, metalness: 0 })
  );
  pad.position.set(0, -1.12, 0);
  pad.receiveShadow = true;
  g.add(pad);

  const tank = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.55), steel);
  tank.position.set(0, -0.32, 0);
  tank.castShadow = true;
  tank.receiveShadow = true;
  g.add(tank);

  const water = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.48), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -0.15, 0.01);
  g.add(water);

  const pumpMat = new THREE.MeshStandardMaterial({
    color: 0x4b5563,
    metalness: 0.45,
    roughness: 0.42,
  });
  const pumps = [];
  for (let i = 0; i < 2; i++) {
    const px = -0.2 + i * 0.4;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.095, 0.22, 18), pumpMat);
    body.position.set(px, 0.02, 0.16);
    body.castShadow = true;
    g.add(body);
    pumps.push(body);
  }

  const alarm = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 12),
    new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x000000,
      emissiveIntensity: 0,
    })
  );
  alarm.position.set(0.38, 0.55, 0.12);
  g.add(alarm);

  return {
    group: g,
    water,
    pumps,
    alarmMat: alarm.material,
  };
}

function applyProcessState(proc, s, _t, dtSec) {
  const high = !!s.HighLevel;
  const yBase = -0.35;
  proc.water.scale.y = high ? 1.12 : 0.75;
  proc.water.position.y = yBase + (high ? 0.22 : 0.08);

  const spd = (run) => (run ? 8.5 : 0) * (prefersReducedMotion ? 0 : 1);
  proc.pumps[0].rotation.y += spd * dtSec * (s.Pump1_Run ? 1 : 0);
  proc.pumps[1].rotation.y += spd * dtSec * (s.Pump2_Run ? 1 : 0);

  proc.alarmMat.emissive.setHex(s.AlarmActive ? 0xff2222 : 0x000000);
  proc.alarmMat.emissiveIntensity = s.AlarmActive ? 0.85 : 0;
  proc.alarmMat.color.setHex(s.AlarmActive ? 0xef4444 : 0x64748b);
}

function buildAnnunciatorLEDs(THREE, count) {
  const grp = new THREE.Group();
  const leds = [];
  const spacing = 0.11;
  const startX = ((-count + 1) * spacing) / 2;
  for (let i = 0; i < count; i++) {
    const m = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x000000,
      emissiveIntensity: 0,
    });
    const led = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.014, 12), m);
    led.rotation.x = Math.PI / 2;
    led.position.set(startX + i * spacing, 0, 0);
    grp.add(led);
    leds.push(led);
  }
  return { group: grp, leds };
}

function mapAnnunciators(ledMeshes, s) {
  const norm = (on) => ({
    emissive: on ? 0x22c55e : 0x0f172a,
    intensity: on ? 0.55 : 0,
    color: on ? 0x86efac : 0x475569,
  });
  if (ledMeshes.length >= 5) {
    const a0 = norm(!!s.IO_Healthy);
    const a1 = norm(!!s.Comm_OK);
    const a2 = norm(!!s.AutoMode);
    const a3 = norm(!!s.Pump1_Run);
    const a4 = norm(!!s.Pump2_Run);
    [a0, a1, a2, a3, a4].forEach((a, i) => {
      const mat = ledMeshes[i].material;
      mat.emissive.setHex(a.emissive);
      mat.emissiveIntensity = a.intensity;
      mat.color.setHex(a.color);
    });
  }
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
    window.dispatchEvent(new CustomEvent("cci-flagship-fallback"));
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

  const manifest = mergeManifest(await fetchManifest());
  const ladderExtract = await fetchLadderExtract(manifest.assets.ladderExtract);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x5c6f82);
  scene.fog = null;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.12, 120);
  const targetBase = new THREE.Vector3(0.08, 0.4, 0);
  const eyeBase = new THREE.Vector3(-0.82, 1.35, 7.25);

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
  renderer.toneMappingExposure = 1.65;

  scene.add(new THREE.AmbientLight(0xb8c4d4, prefersReducedMotion ? 0.7 : 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 1.78);
  key.position.set(4.2, 8.5, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 24;
  key.shadow.camera.left = -9;
  key.shadow.camera.right = 9;
  key.shadow.camera.top = 9;
  key.shadow.camera.bottom = -9;
  key.shadow.bias = -0.00025;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd8e4f4, 0.52);
  fill.position.set(-3, 3, -2);
  scene.add(fill);

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

  const loader = new THREE.TextureLoader();
  const rackHref = manifest.assets.rackImage ? assetUrl(manifest.assets.rackImage) : "";
  const ladderShotHref = manifest.assets.ladderScreenshotFallback
    ? assetUrl(manifest.assets.ladderScreenshotFallback)
    : "";
  const scadaHref = manifest.assets.scadaImage ? assetUrl(manifest.assets.scadaImage) : "";
  const processHref = manifest.assets.processImage ? assetUrl(manifest.assets.processImage) : "";

  const [rackTexRaw, ladderShotTex, scadaImgTex, processTexRaw] = await Promise.all([
    loadTextureOptional(loader, rackHref),
    loadTextureOptional(loader, ladderShotHref),
    loadTextureOptional(loader, scadaHref),
    loadTextureOptional(loader, processHref),
  ]);

  if (rackTexRaw) {
    rackTexRaw.colorSpace = THREE.SRGBColorSpace;
    rackTexRaw.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }
  if (processTexRaw) {
    processTexRaw.colorSpace = THREE.SRGBColorSpace;
    processTexRaw.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  const ladderScreenshotImg = ladderShotTex?.image || null;
  const scadaImage = scadaImgTex?.image || null;

  const rackPanel = buildPhotoPanel(THREE, rackTexRaw, 1.12, 1.48, 0.04);
  rackPanel.group.position.set(-3.22, 0.08, -0.15);
  rackPanel.group.rotation.y = 0.09;
  stage.add(rackPanel.group);

  const LAD_W = 1536;
  const LAD_H = 960;
  const ladderPanel = buildCanvasPanel(THREE, LAD_W, LAD_H, (ctx, w, h, st) => {
    ladderComposite(ctx, w, h, ladderExtract, ladderScreenshotImg, st);
  });
  ladderPanel.group.position.set(0.12, 0.3, 0.62);
  ladderPanel.group.rotation.y = -0.055;
  ladderPanel.texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  stage.add(ladderPanel.group);

  const SCA_W = 1280;
  const SCA_H = 720;
  const scadaPanel = buildCanvasPanel(THREE, SCA_W, SCA_H, (ctx, w, h, st) => {
    scadaComposite(
      ctx,
      w,
      h,
      scadaImage,
      st,
      manifest.assets.scadaImage || "assets/photos/flagship-scada-glen-cairn-dws.png"
    );
  });
  scadaPanel.group.position.set(2.45, 0.78, 0.42);
  scadaPanel.group.scale.setScalar(0.72);
  scadaPanel.group.rotation.y = -0.12;
  scadaPanel.texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  stage.add(scadaPanel.group);

  const procData = buildProcessWetWell(THREE, processTexRaw);
  const proc = procData.group;
  proc.position.set(3.05, 0.04, -0.35);
  proc.rotation.y = -0.11;
  stage.add(proc);

  const ann = buildAnnunciatorLEDs(THREE, 5);
  ann.group.position.set(-2.55, 0.62, 0.55);
  ann.group.rotation.y = 0.12;
  stage.add(ann.group);

  const pRack = new THREE.Vector3(-2.35, 0.38, 0.35);
  const pLad = new THREE.Vector3(0.05, 0.42, 0.78);
  const pSca = new THREE.Vector3(2.15, 0.55, 0.55);
  const pProc = new THREE.Vector3(2.75, 0.28, 0.2);
  stage.add(buildEthernetTubes(THREE, pRack.clone(), pLad.clone().lerp(pRack, 0.5), pLad));
  stage.add(buildEthernetTubes(THREE, pLad.clone(), pSca.clone().lerp(pLad, 0.48), pSca));
  stage.add(buildEthernetTubes(THREE, pLad.clone(), pProc.clone().lerp(pLad, 0.42), pProc));

  stage.rotation.y = -0.035;

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
  let lastT = clock.getElapsedTime();

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
    const dt = Math.min(0.05, t - lastT);
    lastT = t;

    if (!dragging && !prefersReducedMotion) {
      dragYaw *= 0.94;
      dragPitch *= 0.94;
    }

    const state = prefersReducedMotion
      ? { ...manifest.sequence[0] }
      : sampleSequenceState(manifest.sequence, t);

    ladderPanel.redraw(state);
    ladderPanel.texture.needsUpdate = true;
    scadaPanel.redraw(state);
    scadaPanel.texture.needsUpdate = true;

    const lookTarget = targetBase.clone().add(
      new THREE.Vector3(ptrX * 0.11, -ptrY * 0.06, ptrX * 0.035)
    );
    const offset = eyeBase.clone().sub(targetBase);
    const euler = new THREE.Euler(dragPitch, dragYaw + Math.sin(t * 0.06) * 0.008, 0, "YXZ");
    offset.applyEuler(euler);
    offset.add(new THREE.Vector3(Math.sin(t * 0.08) * 0.018, Math.sin(t * 0.1) * 0.01, 0));
    camera.position.copy(lookTarget.clone().add(offset));
    camera.lookAt(lookTarget);

    if (!prefersReducedMotion) applyProcessState(procData, state, t, dt);
    else applyProcessState(procData, state, t, 0);

    mapAnnunciators(ann.leds, state);

    ladderPanel.group.position.x = 0.12 + ptrX * 0.038;
    ladderPanel.group.position.y = 0.3 + ptrY * 0.022;
    rackPanel.group.position.x = -3.22 + ptrX * 0.015;
    scadaPanel.group.position.x = 2.45 - ptrX * 0.018;
    proc.position.x = 3.05 - ptrX * 0.018;

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

