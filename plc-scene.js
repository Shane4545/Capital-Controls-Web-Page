/**
 * Homepage flagship: authored PLC / ladder / process stage — constrained camera, no OrbitControls.
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

function darkConcrete(THREE) {
  return new THREE.MeshStandardMaterial({ color: 0x232830, roughness: 0.92, metalness: 0.05 });
}

function drawLadderCanvas(ctx, w, h, activeRung, t) {
  ctx.fillStyle = "#080c12";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#3d4d63";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(56, 52);
  ctx.lineTo(56, h - 52);
  ctx.moveTo(w - 56, 52);
  ctx.lineTo(w - 56, h - 52);
  ctx.stroke();
  const rungs = 8;
  for (let i = 0; i < rungs; i++) {
    const y = 68 + (i * (h - 136)) / (rungs - 1);
    const active = i === activeRung;
    ctx.strokeStyle = active ? "#00c964" : "#5c6b7e";
    ctx.lineWidth = active ? 5 : 2.2;
    ctx.globalAlpha = active ? 0.92 + 0.08 * Math.sin(t * 5) : 0.88;
    ctx.beginPath();
    ctx.moveTo(56, y);
    ctx.lineTo(w - 56, y);
    ctx.stroke();
    ctx.globalAlpha = 1;
    if (active) {
      ctx.fillStyle = "rgba(0, 201, 100, 0.12)";
      ctx.fillRect(60, y - 12, w - 120, 24);
    }
  }
  ctx.fillStyle = "#b8c5d4";
  ctx.font = "600 15px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("ROUTINE — PUMP_INTERLOCK", 60, 38);
  ctx.fillStyle = "#64748b";
  ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillText("STUDIO 5000 · REPRESENTATIVE", 60, h - 22);
}

function buildRack(THREE) {
  const g = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: 0x151a22,
    metalness: 0.65,
    roughness: 0.42,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x0e1218,
    metalness: 0.5,
    roughness: 0.55,
  });
  const moduleFace = new THREE.MeshStandardMaterial({
    color: 0x1e2632,
    metalness: 0.55,
    roughness: 0.48,
  });
  const psuFace = new THREE.MeshStandardMaterial({
    color: 0x242d3a,
    metalness: 0.5,
    roughness: 0.5,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.09, 0.44), dark);
  base.position.set(0, -1.32, 0);
  base.castShadow = true;
  g.add(base);

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.66, 2.62, 0.4), shell);
  chassis.position.set(0, 0.02, 0);
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  g.add(chassis);

  for (const x of [-0.33, 0.33]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.045, 2.58, 0.045), dark);
    rail.position.set(x, 0.02, -0.14);
    rail.castShadow = true;
    g.add(rail);
  }

  const back = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.58, 0.04), dark);
  back.position.set(0, 0.02, -0.2);
  g.add(back);

  for (let i = 0; i < 18; i++) {
    const tb = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.055, 0.07), moduleFace);
    tb.position.set(-0.28 + i * 0.033, -0.98, 0.21);
    tb.castShadow = true;
    g.add(tb);
  }

  const psu = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.4, 0.3), psuFace);
  psu.position.set(0, -0.68, 0.05);
  psu.castShadow = true;
  g.add(psu);
  for (let v = 0; v < 6; v++) {
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.014, 0.02), dark);
    slit.position.set(0, -0.72 + v * 0.055, 0.17);
    g.add(slit);
  }

  const cpu = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.48, 0.3), moduleFace);
  cpu.position.set(0, -0.05, 0.05);
  cpu.castShadow = true;
  g.add(cpu);
  const cpuStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.045, 0.02),
    new THREE.MeshStandardMaterial({
      color: 0x003d24,
      emissive: 0x004d2e,
      emissiveIntensity: 0.35,
      metalness: 0.2,
      roughness: 0.4,
    })
  );
  cpuStrip.position.set(0, -0.02, 0.17);
  g.add(cpuStrip);

  const ioYs = [0.38, 0.82, 1.22, 1.62];
  const leds = [];
  ioYs.forEach((y, idx) => {
    const io = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.34, 0.28), moduleFace);
    io.position.set(0, y, 0.04);
    io.castShadow = true;
    g.add(io);
    for (let p = 0; p < 4; p++) {
      const port = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0x2a3442, metalness: 0.7, roughness: 0.35 })
      );
      port.rotation.z = Math.PI / 2;
      port.position.set(-0.2 + p * 0.13, y, 0.16);
      g.add(port);
    }
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0x1a2a22, emissive: 0x000000, emissiveIntensity: 0 })
    );
    led.position.set(0.24, y + 0.02, 0.16);
    g.add(led);
    leds.push(led);
  });

  const ledCpu = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x1a2a22, emissive: 0x000000, emissiveIntensity: 0 })
  );
  ledCpu.position.set(0.22, -0.08, 0.17);
  g.add(ledCpu);
  leds.push(ledCpu);

  const cableMat = new THREE.MeshStandardMaterial({ color: 0x1a1510, roughness: 0.85 });
  const c1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, -1.28, 0.22),
    new THREE.Vector3(-0.45, -1.48, 0.55),
    new THREE.Vector3(-0.9, -1.55, 0.85),
  ]);
  const tube1 = new THREE.Mesh(new THREE.TubeGeometry(c1, 32, 0.028, 8, false), cableMat);
  tube1.castShadow = true;
  g.add(tube1);

  return { group: g, leds };
}

function buildLadderPanel(THREE, ladderTex) {
  const grp = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x2a3544,
    metalness: 0.75,
    roughness: 0.28,
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
    emissive: 0x050808,
    emissiveIntensity: 0.08,
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glassMat);
  panel.position.z = 0.04;
  grp.add(panel);

  const backGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.98, h * 0.98),
    new THREE.MeshBasicMaterial({ color: 0x0a1018, transparent: true, opacity: 0.55 })
  );
  backGlow.position.z = -0.02;
  grp.add(backGlow);

  return grp;
}

function buildProcess(THREE) {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({
    color: 0x2a323f,
    metalness: 0.6,
    roughness: 0.4,
  });
  const inner = new THREE.MeshStandardMaterial({ color: 0x121820, roughness: 0.9 });
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1a4555,
    metalness: 0.05,
    roughness: 0.22,
    transparent: true,
    opacity: 0.88,
  });

  const pad = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.07, 0.85), darkConcrete(THREE));
  pad.position.set(0, -1.18, 0);
  pad.receiveShadow = true;
  g.add(pad);

  const tankOuter = new THREE.Mesh(new THREE.BoxGeometry(0.78, 1.05, 0.62), steel);
  tankOuter.position.set(0, -0.35, 0);
  tankOuter.castShadow = true;
  tankOuter.receiveShadow = true;
  g.add(tankOuter);

  const tankInner = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.95, 0.5), inner);
  tankInner.position.set(0, -0.28, 0.02);
  g.add(tankInner);

  const water = new THREE.Mesh(new THREE.CircleGeometry(0.29, 48), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, 0.12, 0.02);
  g.add(water);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.75),
    new THREE.MeshPhysicalMaterial({
      color: 0x8899aa,
      metalness: 0,
      roughness: 0.06,
      transmission: 0.55,
      thickness: 0.25,
      transparent: true,
      opacity: 0.35,
    })
  );
  glass.position.set(0, -0.08, 0.33);
  g.add(glass);

  const pumpMat = new THREE.MeshStandardMaterial({
    color: 0x343d4c,
    metalness: 0.55,
    roughness: 0.38,
  });
  const spinners = [];
  for (let i = 0; i < 2; i++) {
    const px = -0.22 + i * 0.44;
    const pump = new THREE.Group();
    pump.position.set(px, 0.08, 0.18);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.26, 20), pumpMat);
    body.castShadow = true;
    const flange = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.022, 10, 24),
      new THREE.MeshStandardMaterial({ color: 0x3d4a59, metalness: 0.6, roughness: 0.35 })
    );
    flange.rotation.x = Math.PI / 2;
    flange.position.y = 0.14;
    const spin = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.016, 8, 24),
      new THREE.MeshStandardMaterial({
        color: 0x00a651,
        metalness: 0.4,
        roughness: 0.35,
        emissive: 0x002818,
        emissiveIntensity: 0.15,
      })
    );
    spin.rotation.x = Math.PI / 2;
    spin.position.y = 0.13;
    pump.add(body, flange, spin);
    spinners.push(spin);
    g.add(pump);
  }

  const sensor = new THREE.Group();
  sensor.position.set(0, 0.9, 0.15);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.12), steel);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00a651,
    transparent: true,
    opacity: 0.42,
  });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.95, 10), beamMat);
  beam.position.y = -0.48;
  sensor.add(head, beam);
  g.add(sensor);

  return { group: g, water, beamMat, spinners };
}

function buildLinkTubes(THREE, p0, p1, p2) {
  const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x006b3c,
    emissive: 0x002514,
    emissiveIntensity: 0.25,
    metalness: 0.35,
    roughness: 0.45,
    transparent: true,
    opacity: 0.75,
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
  scene.background = new THREE.Color(0x06080e);
  scene.fog = new THREE.FogExp2(0x06080e, 0.028);

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
  renderer.toneMappingExposure = 1.05;

  const amb = new THREE.AmbientLight(0x2a3f55, prefersReducedMotion ? 0.38 : 0.32);
  scene.add(amb);
  const key = new THREE.DirectionalLight(0xf0f3f8, 1.05);
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
  const fill = new THREE.DirectionalLight(0x8899bb, 0.28);
  fill.position.set(-3, 3, -2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x00a651, prefersReducedMotion ? 0 : 0.08);
  rim.position.set(-2, 1.5, -4);
  scene.add(rim);

  const stage = new THREE.Group();
  scene.add(stage);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4040, 40),
    new THREE.MeshStandardMaterial({ color: 0x070a10, roughness: 1, metalness: 0 })
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

  const procData = buildProcess(THREE);
  const proc = procData.group;
  proc.position.set(3.15, 0.06, -0.2);
  proc.rotation.y = -0.1;
  stage.add(proc);

  const pRack = new THREE.Vector3(-2.2, 0.35, 0.35);
  const pLadder = new THREE.Vector3(0.2, 0.45, 0.75);
  const pProc = new THREE.Vector3(2.35, 0.25, 0.25);
  stage.add(buildLinkTubes(THREE, pRack.clone(), pLadder.clone().lerp(pRack, 0.5), pLadder));
  stage.add(buildLinkTubes(THREE, pLadder.clone(), pProc.clone().lerp(pLadder, 0.45), pProc));

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
      rung = Math.floor((t * 0.5) % 8);
      drawLadderCanvas(lctx, lcvs.width, lcvs.height, rung, t);
      ladderTex.needsUpdate = true;
      procData.water.scale.set(1, 1 + Math.sin(t * 1.05) * 0.012, 1);
      procData.water.position.y = 0.12 + Math.sin(t * 0.95) * 0.01;
      procData.beamMat.opacity = 0.32 + 0.2 * Math.sin(t * 2.6);
      procData.spinners.forEach((s) => {
        s.rotation.z = t * 2.6;
      });
      ladder.position.x = 0.15 + ptrX * 0.04;
      ladder.position.y = 0.28 + ptrY * 0.025;
      rack.position.x = -3.25 + ptrX * 0.02;
      proc.position.x = 3.15 - ptrX * 0.02;
      rackData.leds.forEach((led, i) => {
        const mat = led.material;
        const on = i === rung % rackData.leds.length;
        mat.emissive.setHex(on ? 0x00c964 : 0x000000);
        mat.emissiveIntensity = on ? 0.75 : 0;
      });
    } else {
      drawLadderCanvas(lctx, lcvs.width, lcvs.height, 3, 0);
      ladderTex.needsUpdate = true;
      procData.beamMat.opacity = 0.38;
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
