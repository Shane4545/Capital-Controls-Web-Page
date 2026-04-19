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

initCinemaPageProgress();
initCinemaScrollSpine();
initCinemaHeader();
initSectionReveal();
