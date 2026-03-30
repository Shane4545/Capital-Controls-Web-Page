/**
 * Cinematic homepage: spine scroll, hero sequence, signal-flow activation,
 * engineering readout, label↔node sync, section reveals.
 */
const cinemaReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const READOUT_STAGES = [
  "Idle — awaiting energize",
  "Field I/O online",
  "Marshalling verified",
  "PLC logic in service",
  "Plant network path OK",
  "SCADA layer active",
  "Process loop closed — topology nominal",
];

function setScrollSpineVar() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const p = Math.min(1, Math.max(0, window.scrollY / max));
  document.body.style.setProperty("--cin-scroll-pct", String(p));
}

function initCinemaScrollSpine() {
  if (cinemaReduced) {
    document.body.style.setProperty("--cin-scroll-pct", "0.5");
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
    hero.classList.add("is-entered", "is-schematic");
    return;
  }
  const enterDelay = 220;
  window.setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add("is-entered"));
    });
  }, enterDelay);
  window.setTimeout(() => hero.classList.add("is-schematic"), enterDelay + 980);
}

function initCinemaSignalFlow() {
  const root = document.querySelector(".cinema-signal");
  if (!root) return;
  const readoutEl = root.querySelector("[data-signal-readout]");
  const paths = root.querySelectorAll(".cinema-signal__path--energy");
  const nodes = root.querySelectorAll(".cinema-signal__node-group");
  const labels = root.querySelectorAll(".cinema-signal__label[data-node-index]");

  paths.forEach((path) => {
    try {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = cinemaReduced ? "0" : String(len);
    } catch {
      /* ignore */
    }
  });

  function setReadout(i) {
    if (!readoutEl) return;
    const text = READOUT_STAGES[Math.min(i, READOUT_STAGES.length - 1)];
    readoutEl.textContent = text;
  }

  function syncLabel(i, live) {
    labels.forEach((lb) => {
      const idx = parseInt(lb.getAttribute("data-node-index"), 10);
      if (idx === i) {
        lb.classList.toggle("is-live", live);
      }
    });
  }

  labels.forEach((lb) => {
    const idx = parseInt(lb.getAttribute("data-node-index"), 10);
    lb.addEventListener("mouseenter", () => {
      nodes.forEach((n) =>
        n.classList.toggle("is-highlight", parseInt(n.getAttribute("data-node"), 10) === idx)
      );
      lb.classList.add("is-highlight");
    });
    lb.addEventListener("mouseleave", () => {
      nodes.forEach((n) => n.classList.remove("is-highlight"));
      lb.classList.remove("is-highlight");
    });
    lb.addEventListener("focus", () => {
      nodes.forEach((n) =>
        n.classList.toggle("is-highlight", parseInt(n.getAttribute("data-node"), 10) === idx)
      );
    });
    lb.addEventListener("blur", () => {
      nodes.forEach((n) => n.classList.remove("is-highlight"));
    });
  });

  if (cinemaReduced) {
    root.classList.add("cinema-signal--active", "cinema-signal--charged");
    nodes.forEach((n) => n.classList.add("is-live"));
    labels.forEach((lb) => lb.classList.add("is-live"));
    setReadout(READOUT_STAGES.length - 1);
    return;
  }

  setReadout(0);

  const io = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((en) => en.isIntersecting);
      if (!hit) return;
      io.disconnect();
      root.classList.add("cinema-signal--active");

      paths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.13}s`;
        path.style.strokeDashoffset = "0";
      });

      nodes.forEach((node, i) => {
        window.setTimeout(() => {
          node.classList.add("is-live");
          syncLabel(i, true);
          setReadout(i + 1);
        }, 220 + i * 155);
      });

      const chargeDelay = 220 + nodes.length * 155 + 900;
      window.setTimeout(() => {
        root.classList.add("cinema-signal--charged");
        paths.forEach((path) => {
          path.style.transition = "none";
          path.style.strokeDasharray = "7 22";
          path.style.strokeDashoffset = "0";
        });
      }, chargeDelay);
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
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

initCinemaScrollSpine();
initCinemaHeader();
initCinemaHeroEntrance();
initCinemaSignalFlow();
initCinemaSectionReveals();
