/**
 * Homepage: scroll spine cue and header state on .home-proof-hero.
 */
const cinemaReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setScrollSpineVar() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const p = Math.min(1, Math.max(0, window.scrollY / max));
  document.body.style.setProperty("--cin-scroll-pct", String(p));
  const bright = 0.32 + p * 0.58;
  document.body.style.setProperty("--cin-spine-bright", String(bright));
}

/** Top-of-viewport reading progression */
function initCinemaPageProgress() {
  const root = document.documentElement;
  if (cinemaReduced) {
    root.style.setProperty("--cin-page-progress", "1");
    return;
  }
  let scheduled = false;
  function update() {
    scheduled = false;
    const scrollTop = root.scrollTop || document.body.scrollTop;
    const docHeight = root.scrollHeight - window.innerHeight;
    const pRaw = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    const p = pRaw < 0.02 ? 0.04 : pRaw;
    root.style.setProperty("--cin-page-progress", p.toFixed(4));
  }
  function onScroll() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

function initCinemaScrollSpine() {
  if (cinemaReduced) {
    document.body.style.setProperty("--cin-scroll-pct", "0.5");
    document.body.style.setProperty("--cin-spine-bright", "0.48");
    return;
  }
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrollSpineVar();
      });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", setScrollSpineVar, { passive: true });
  setScrollSpineVar();
}

function initCinemaHeader() {
  const header = document.querySelector(".page-home--cinematic .site-header");
  const hero = document.querySelector(".home-hero-dominant") || document.querySelector(".home-proof-hero");
  if (!header || !hero) return;
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e) return;
      header.classList.toggle("is-scrolled", !e.isIntersecting);
    },
    { threshold: 0, rootMargin: "-40px 0px 0px 0px" }
  );
  io.observe(hero);
}

function initSectionReveal() {
  if (cinemaReduced) {
    document.querySelectorAll(".cinema-section, .home-stats-strip").forEach((el) => {
      el.classList.add("cinema-section--visible", "cci-scene-in");
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cinema-section--visible", "cci-scene-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".cinema-section, .home-stats-strip").forEach((el) => io.observe(el));
}

/** Hero network canvas — subtle animated node/trace linework */
function initHeroCanvas() {
  if (cinemaReduced) return;
  const canvas = document.querySelector('.hero-network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = 0, H = 0, nodes = [], animId = null;

  const GREEN = 'rgba(0,200,90,';
  const BLUE  = 'rgba(100,180,255,';

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    buildNodes();
  }

  function buildNodes() {
    const count = Math.round((W * H) / 28000);
    nodes = Array.from({ length: Math.max(12, Math.min(count, 28)) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.18,
      r: 1.5 + Math.random() * 1.2,
      color: Math.random() > 0.5 ? GREEN : BLUE,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  const MAX_DIST = 160;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      a.pulse += 0.018;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `${GREEN}${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const glow = 0.5 + 0.5 * Math.sin(n.pulse);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `${n.color}${0.35 + glow * 0.45})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `${n.color}${0.07 * glow})`;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas.parentElement);
  resize();
  draw();

  // Pause when hero leaves viewport
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!animId) draw();
    } else {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
    }
  }, { threshold: 0 });
  io.observe(canvas.parentElement);
}

/** Staggered data-reveal entrance */
function initRevealObserver() {
  if (cinemaReduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

initCinemaPageProgress();
initCinemaScrollSpine();
initCinemaHeader();
initSectionReveal();
initHeroCanvas();
initRevealObserver();
