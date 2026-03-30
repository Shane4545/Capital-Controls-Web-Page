(function () {
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var page = document.body.getAttribute("data-page");
  var navFileByPage = {
    markets: "markets.html",
    about: "about.html",
    services: "services.html",
    platforms: "platforms.html",
    experience: "experience.html",
    process: "process.html",
    contact: "contact.html",
  };
  if (page && navFileByPage[page]) {
    document.querySelectorAll('.nav-list a[href="' + navFileByPage[page] + '"]').forEach(function (a) {
      a.setAttribute("aria-current", "page");
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("site-header--elevated", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  var backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "back-to-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML =
    '<span class="back-to-top-icon" aria-hidden="true">\u2191</span><span class="back-to-top-text">Top</span>';
  document.body.appendChild(backBtn);
  var toggleBack = function () {
    var show = window.scrollY > 480;
    backBtn.classList.toggle("is-visible", show);
    backBtn.setAttribute("tabindex", show ? "0" : "-1");
  };
  toggleBack();
  window.addEventListener("scroll", toggleBack, { passive: true });
  backBtn.addEventListener("click", function () {
    var instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }
})();
