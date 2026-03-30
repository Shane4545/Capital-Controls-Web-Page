/**
 * Capital Controls — automation-themed motion: view transitions, 3D hero,
 * scroll reveals, link prefetch.
 */
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isInternalHtmlLink(anchor) {
  if (!anchor || anchor.tagName !== "A") return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return false;
  if (anchor.getAttribute("target") === "_blank") return false;
  if (anchor.hasAttribute("download")) return false;
  let u;
  try {
    u = new URL(anchor.href);
  } catch {
    return false;
  }
  if (u.origin !== window.location.origin) return false;
  const path = u.pathname;
  const file = path.split("/").pop() || "";
  if (file.includes(".") && !file.endsWith(".html")) return false;
  return true;
}

function initViewTransitions() {
  if (prefersReduced || typeof document.startViewTransition !== "function") return;
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || !isInternalHtmlLink(a)) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const url = new URL(a.href);
    if (url.href === window.location.href) return;
    e.preventDefault();
    document.startViewTransition(() => {
      window.location.assign(url.href);
    });
  });
}

function initLinkPrefetch() {
  const done = new Set();
  document.addEventListener(
    "pointerenter",
    (e) => {
      const a = e.target.closest("a");
      if (!a || !isInternalHtmlLink(a)) return;
      const href = a.href;
      if (done.has(href)) return;
      done.add(href);
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "document";
      document.head.appendChild(link);
    },
    { passive: true, capture: true }
  );
}

function initScrollReveals() {
  if (prefersReduced) {
    document.querySelectorAll(".cci-reveal").forEach((el) => el.classList.add("cci-reveal--visible"));
    return;
  }
  const els = document.querySelectorAll(".cci-reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("cci-reveal--visible");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

function initHeroThree(canvas) {
  if (!canvas || prefersReduced) return;
  const hero = canvas.closest(".hero--automation");
  if (!hero) return;

  const start = () => {
    import("https://esm.sh/three@0.160.0")
      .then((THREE) => {
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(48, 2, 0.1, 200);
        cam.position.z = 36;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const group = new THREE.Group();
        scene.add(group);

        const n = window.innerWidth < 960 ? 32 : 64;
        const pos = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const u = Math.random();
          const v = Math.random();
          const theta = 2 * Math.PI * u;
          const phi = Math.acos(2 * v - 1);
          const r = 10 + Math.random() * 6;
          pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos[i * 3 + 2] = r * Math.cos(phi);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const ptsMaterial = new THREE.PointsMaterial({
          color: 0x00a651,
          size: 0.22,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true,
        });
        const pts = new THREE.Points(geo, ptsMaterial);
        group.add(pts);

        const linePos = [];
        for (let i = 0; i < n; i += 2) {
          const j = (i + 17 + Math.floor(Math.random() * 8)) % n;
          linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          linePos.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(linePos), 3)
        );
        const lines = new THREE.LineSegments(
          lineGeo,
          new THREE.LineBasicMaterial({
            color: 0x002d62,
            transparent: true,
            opacity: 0.35,
          })
        );
        group.add(lines);

        const grid = new THREE.GridHelper(80, 24, 0x002d62, 0xc5cdd8);
        grid.position.y = -14;
        grid.material.opacity = 0.16;
        grid.material.transparent = true;
        scene.add(grid);

        function resize() {
          const w = hero.clientWidth;
          const h = hero.clientHeight;
          if (w < 2 || h < 2) return;
          cam.aspect = w / h;
          cam.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(hero);

        let rafId = 0;
        let pulseTime = 0;
        function tick() {
          rafId = requestAnimationFrame(tick);
          group.rotation.y += 0.0018;
          group.rotation.x += 0.0004;
          
          pulseTime += 0.016;
          const pulse = 0.75 + 0.2 * Math.sin(pulseTime * 0.6);
          ptsMaterial.opacity = pulse;
          
          renderer.render(scene, cam);
        }
        tick();
      })
      .catch((err) => {
        console.warn("Three.js canvas failed to load:", err);
        canvas.classList.add("cci-3d-canvas--failed");
      });
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        io.disconnect();
        start();
      }
    },
    { rootMargin: "120px" }
  );
  io.observe(hero);
}

function markRevealTargets() {
  const sel = "main .section, .page-hero, .partner-strip";
  document.querySelectorAll(sel).forEach((el) => {
    if (!el.classList.contains("cci-reveal")) el.classList.add("cci-reveal");
  });
  const proseMain = document.querySelector("main.prose-page");
  if (proseMain) {
    proseMain.querySelectorAll(":scope > .prose-block").forEach((el, i) => {
      if (i < 5 && !el.classList.contains("cci-reveal")) el.classList.add("cci-reveal");
    });
  }
}

function initHeroEntrance() {
  if (prefersReduced) return;
  const hero = document.querySelector(".hero--cinematic, .hero--elite, .hero--automation");
  if (!hero) return;
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.classList.add("hero-entrance");
    });
  });
}

/** Single signature motion: subtle lerped parallax on SCADA layer (fine pointer only). */
function initHeroParallax() {
  if (prefersReduced) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const hero = document.querySelector(".hero--cinematic");
  const root = hero?.querySelector(".hero-cinematic-parallax-root");
  if (!hero || !root) return;

  const maxX = 16;
  const maxY = 11;
  let targetX = 0;
  let targetY = 0;
  let curX = 0;
  let curY = 0;
  let frameId = 0;

  function step() {
    curX += (targetX - curX) * 0.065;
    curY += (targetY - curY) * 0.065;
    root.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
    if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
      frameId = requestAnimationFrame(step);
    } else {
      frameId = 0;
    }
  }

  function queue() {
    if (!frameId) frameId = requestAnimationFrame(step);
  }

  hero.addEventListener(
    "pointermove",
    (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetX = -nx * 2 * maxX;
      targetY = -ny * 2 * maxY;
      queue();
    },
    { passive: true }
  );

  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    queue();
  });
}

initViewTransitions();
initLinkPrefetch();
markRevealTargets();
initScrollReveals();
initHeroThree(document.getElementById("cci-3d-canvas"));
initHeroEntrance();
initHeroParallax();
