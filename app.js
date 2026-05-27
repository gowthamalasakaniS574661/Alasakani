(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ===== Typing Effect =====
  const typingPhrases = [
    "scalable ETL pipelines.",
    "cloud-native data solutions.",
    "analytics-ready datasets.",
    "production ML pipelines.",
    "real-time data systems.",
    "microservices with FastAPI.",
  ];

  const typingEl = document.getElementById("typingText");
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeLoop() {
    if (!typingEl) return;
    const phrase = typingPhrases[phraseIdx];

    if (!deleting) {
      typingEl.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
      setTimeout(typeLoop, 60);
    } else {
      typingEl.textContent = phrase.slice(0, charIdx);
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 30);
    }
  }
  setTimeout(typeLoop, 800);

  // ===== Header Scroll Behavior =====
  const header = document.getElementById("header");
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", scrollY > 50);
    }

    // Scroll progress bar
    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }

    // Back to top button
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      backToTop.classList.toggle("visible", scrollY > 500);
    }

    // Active nav link detection
    updateActiveNav();
    lastScroll = scrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Active Nav Link =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  // ===== Mobile Menu =====
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  let overlay = null;

  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", closeMenu);
  }

  function openMenu() {
    nav.classList.add("open");
    menuToggle.classList.add("open");
    if (!overlay) createOverlay();
    requestAnimationFrame(() => overlay.classList.add("visible"));
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("open");
    if (overlay) overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  // ===== Back to Top =====
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  // ===== Scroll Reveal (IntersectionObserver) =====
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (!prefersReduced) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0", 10);
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  // ===== Animated Counters =====
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  // ===== Cursor Glow =====
  if (!prefersReduced) {
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow) {
      let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function updateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + "px";
        cursorGlow.style.top = glowY + "px";
        requestAnimationFrame(updateGlow);
      }

      updateGlow();
    }
  }

  // ===== Particle Background =====
  if (!prefersReduced) {
    const canvas = document.getElementById("particleCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let particles = [];
      let w, h;

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }

      resize();
      window.addEventListener("resize", resize);

      function createParticles() {
        const count = Math.min(Math.floor(w * h / 15000), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
          });
        }
      }

      createParticles();
      window.addEventListener("resize", createParticles);

      function drawParticles() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(108, 99, 255, ${p.alpha})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(drawParticles);
      }

      drawParticles();
    }
  }
})();
