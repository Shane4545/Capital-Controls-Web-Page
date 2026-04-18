/**
 * Interior scene pacing — IntersectionObserver reveals (Experience Director + Motion Director)
 * No particles, no parallax spam: single beat per block.
 */
(function () {
  if (!document.body.classList.contains("cci-cinematic")) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selectors = [
    ".partner-strip",
    ".credibility-micro",
    ".prose-block",
    ".sales-evidence-callout",
    ".cert-callout",
    ".contact-card-prose",
    ".credibility-strip",
    ".careers-band",
    ".contact-layout > *",
  ];

  const nodes = [];
  document.querySelectorAll(selectors.join(",")).forEach((el) => {
    nodes.push(el);
  });

  if (!nodes.length) return;

  if (reduced) {
    nodes.forEach((el) => el.classList.add("cci-scene-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("cci-scene-in");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
  );

  nodes.forEach((el) => io.observe(el));
})();
