/* Gevelhelden — light interactions */
(() => {
  // Mark JS ready so reveal-on-scroll CSS can hide content. If JS is disabled,
  // content stays visible (no .js-ready class is ever set).
  document.documentElement.classList.add("js-ready");

  // ---------- Mobile nav: inject hamburger, wire toggle + drawer ----------
  const navInner = document.querySelector(".nav__inner");
  const navMenu = document.querySelector(".nav__menu");
  if (navInner && navMenu && !document.querySelector(".nav__toggle")) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav__toggle";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-menu");
    toggle.innerHTML = "<span></span>";
    navMenu.id = "primary-menu";
    navInner.appendChild(toggle);
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };
    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      navMenu.classList.add("is-open");
      document.body.classList.add("nav-open");
    };
    toggle.addEventListener("click", () => {
      toggle.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => io.observe(el));

    // Safety: anything still hidden after 2.5s (e.g. screenshot tools that don't
    // fire scroll) gets revealed anyway so users never see stuck blank sections.
    setTimeout(() => {
      reveals.forEach(el => { if (!el.classList.contains("is-in")) el.classList.add("is-in"); });
    }, 2500);
  } else {
    reveals.forEach(el => el.classList.add("is-in"));
  }

  // ---------- Multi-step form ----------
  document.querySelectorAll("[data-stepper]").forEach(form => {
    const steps = form.querySelectorAll("[data-step]");
    const dots = form.querySelectorAll("[data-step-dot]");
    const prev = form.querySelector("[data-step-prev]");
    const next = form.querySelector("[data-step-next]");
    const submit = form.querySelector("[data-step-submit]");
    let i = 0;

    const show = (n) => {
      i = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach((s, idx) => s.style.display = idx === i ? "" : "none");
      dots.forEach((d, idx) => d.classList.toggle("is-on", idx <= i));
      if (prev) prev.disabled = i === 0;
      if (next) next.style.display = i === steps.length - 1 ? "none" : "";
      if (submit) submit.style.display = i === steps.length - 1 ? "" : "none";
    };

    next?.addEventListener("click", () => show(i + 1));
    prev?.addEventListener("click", () => show(i - 1));
    show(0);
  });

  // ---------- Hero video: smooth reverse-loop (no abrupt cut) ----------
  // We mirror `currentTime` by hand on a single <video> rather than using
  // `playbackRate = -1`, because reverse playback is not reliably supported
  // across mobile and Safari, and it pauses the video. The video stays
  // running forward; we fade a duplicate <video> that we scrub backwards in
  // step with it. When we crossfade, the cut is hidden by the fade.
  const heroA = document.getElementById("hero-video-a");
  const heroB = document.getElementById("hero-video-b");
  if (heroA && heroB) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // Honour the system preference: just let A loop natively, hide B.
      heroA.loop = true;
      heroB.style.display = "none";
    } else {
      // B is the reverse-mirror. It never plays; we scrub its `currentTime`
      // to `duration - A.currentTime` every frame, and crossfade visibility
      // between A and B at the loop boundary.
      const FADE_MS = 600; // crossfade duration
      let mirroring = false;
      let lastSwapAt = -Infinity;

      const prime = () => {
        if (!isFinite(heroA.duration) || heroA.duration <= 0) return;
        // Show A first, hide B until we crossfade.
        heroA.style.opacity = "1";
        heroB.style.opacity = "0";
        heroA.style.transition = `opacity ${FADE_MS}ms linear`;
        heroB.style.transition = `opacity ${FADE_MS}ms linear`;
        heroA.play().catch(() => {});
        mirroring = true;
        requestAnimationFrame(tick);
      };

      const tick = () => {
        if (!mirroring) return;
        const d = heroA.duration;
        const t = heroA.currentTime;
        if (isFinite(d) && d > 0) {
          // B mirrors A by showing the frame at `d - t`. As A approaches `d`,
          // B's mirrored time approaches 0, so B is showing the beginning.
          try { heroB.currentTime = Math.max(0, d - t); } catch (_) {}
        }
        // When A is near its end, swap visibility. The fade hides the
        // `currentTime = 0` reset.
        const now = performance.now();
        if (isFinite(d) && d > 0 && t > d - 0.05 && now - lastSwapAt > d * 500) {
          lastSwapAt = now;
          heroA.style.opacity = "0";
          heroB.style.opacity = "1";
          // After the fade, reset A to 0 and swap back invisibly.
          setTimeout(() => {
            try { heroA.currentTime = 0; } catch (_) {}
            heroA.style.opacity = "1";
            heroB.style.opacity = "0";
            // Re-prime A's playback if it paused on the seek.
            if (heroA.paused) heroA.play().catch(() => {});
          }, FADE_MS + 20);
        }
        requestAnimationFrame(tick);
      };

      heroA.addEventListener("loadedmetadata", prime, { once: true });
      // If metadata is already there (cached), prime now.
      if (heroA.readyState >= 1) prime();
    }
  }

  // ---------- Smooth anchor scroll with sticky offset ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id && id.length > 1) {
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });
})();
