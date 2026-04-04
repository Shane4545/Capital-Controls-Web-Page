/**
 * Homepage: spine scroll, restrained hero entrance, signal diagram, section reveals.
 */
const cinemaReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const READOUT_STAGES = [
  "Overview",
  "Field instruments",
  "I/O terminations",
  "PLC controller",
  "Plant network",
  "HMI / SCADA",
  "Process equipment",
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
    hero.classList.add("is-entered");
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add("is-entered"));
  });
}

/** CCI-owned hero loop only — `assets/video/cci-hero-loop.mp4`. Injected only if HEAD returns 200 (no stock, no 404 noise). */
const CCI_HERO_MP4 = "assets/video/cci-hero-loop.mp4?v=5";

async function initCinemaHeroVideo() {
  if (cinemaReduced) return;
  const hero = document.querySelector(".cinema-hero");
  const media = hero?.querySelector(".cinema-hero__media");
  const img = hero?.querySelector(".cinema-hero__img");
  if (!hero || !media || !img) return;

  let exists = false;
  try {
    let res = await fetch(CCI_HERO_MP4, { method: "HEAD", cache: "no-store" });
    if (res.ok) {
      exists = true;
    } else if (res.status === 405 || res.status === 501) {
      res = await fetch(CCI_HERO_MP4, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        cache: "no-store",
      });
      exists = res.ok || res.status === 206;
    }
  } catch {
    return;
  }
  if (!exists) return;

  const posterAttr = img.getAttribute("src") || "";
  const video = document.createElement("video");
  video.className = "cinema-hero__video";
  video.setAttribute("data-cinema-hero-video", "");
  if (posterAttr) {
    video.setAttribute("poster", posterAttr);
  }
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.preload = "auto";
  video.autoplay = true;
  video.tabIndex = -1;
  video.setAttribute("aria-hidden", "true");
  const source = document.createElement("source");
  source.src = CCI_HERO_MP4;
  source.type = "video/mp4";
  video.appendChild(source);

  const grain = media.querySelector(".cinema-hero__filmgrain");
  if (grain) {
    media.insertBefore(video, grain);
  } else {
    media.appendChild(video);
  }

  let revealed = false;
  function markReady() {
    if (revealed) return;
    revealed = true;
    hero.classList.add("is-video-ready");
  }

  video.addEventListener("loadeddata", markReady);
  video.addEventListener("canplay", markReady);
  video.addEventListener("playing", markReady);
  video.addEventListener("error", () => {
    hero.classList.remove("is-video-ready");
    hero.classList.add("is-hero-video-failed");
    video.remove();
  });

  function tryPlay() {
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {});
    }
  }

  if (video.readyState >= 2) {
    markReady();
  }

  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (!e) return;
      if (e.isIntersecting) {
        tryPlay();
      } else {
        video.pause();
      }
    },
    { threshold: 0.01, rootMargin: "0px 0px 12% 0px" }
  );
  io.observe(hero);

  tryPlay();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      video.pause();
    } else if (hero.getBoundingClientRect().bottom > 0) {
      tryPlay();
    }
  });
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
    root.classList.add("cinema-signal--active");
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
        path.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.1}s`;
        path.style.strokeDashoffset = "0";
      });

      nodes.forEach((node, i) => {
        window.setTimeout(() => {
          node.classList.add("is-live");
          syncLabel(i, true);
          setReadout(i + 1);
        }, 200 + i * 120);
      });
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
void initCinemaHeroVideo();
initCinemaSignalFlow();
initCinemaSectionReveals();
