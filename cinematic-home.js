/**
 * Cinematic homepage: header state, hero entrance, signal-flow activation,
 * section reveals. Loaded only on index with .page-home--cinematic.
 */
const cinemaReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initCinemaHeader() {
  const header = document.querySelector(".page-home--cinematic .site-header");
  const hero = document.querySelector(".cinema-hero");
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

function initCinemaHeroEntrance() {
  const hero = document.querySelector(".cinema-hero");
  if (!hero) return;
  if (cinemaReduced) {
    hero.classList.add("is-entered");
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add("is-entered"));
  });
}

function initCinemaSignalFlow() {
  const root = document.querySelector(".cinema-signal");
  if (!root) return;
  const paths = root.querySelectorAll(".cinema-signal__path--energy");
  paths.forEach((path) => {
    try {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = cinemaReduced ? "0" : String(len);
    } catch {
      /* ignore */
    }
  });
  const nodes = root.querySelectorAll(".cinema-signal__node-group");
  if (cinemaReduced) {
    root.classList.add("cinema-signal--active");
    nodes.forEach((n) => n.classList.add("is-live"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((en) => en.isIntersecting);
      if (!hit) return;
      io.disconnect();
      root.classList.add("cinema-signal--active");
      paths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.15s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.11}s`;
        path.style.strokeDashoffset = "0";
      });
      nodes.forEach((node, i) => {
        window.setTimeout(() => node.classList.add("is-live"), 180 + i * 130);
      });
    },
    { threshold: 0.22, rootMargin: "0px 0px -5% 0px" }
  );
  io.observe(root);
}

function initCinemaSectionReveals() {
  const sections = document.querySelectorAll(".cinema-section[data-cinema-reveal]");
  if (!sections.length) return;
  if (cinemaReduced) {
    sections.forEach((s) => s.classList.add("cinema-section--visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("cinema-section--visible");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
  );
  sections.forEach((s) => io.observe(s));
}

initCinemaHeader();
initCinemaHeroEntrance();
initCinemaSignalFlow();
initCinemaSectionReveals();
