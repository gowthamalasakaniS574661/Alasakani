document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navMenu = document.getElementById("navMenu");
  const mobileToggle = document.getElementById("mobileToggle");

  /* THEME SETUP */
  const saved = localStorage.getItem("color-scheme");
  if (saved) {
    root.setAttribute("data-color-scheme", saved);
    themeToggle.textContent = saved === "dark" ? "☀️" : "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-color-scheme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-color-scheme", next);
    localStorage.setItem("color-scheme", next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  });

  /* MOBILE MENU */
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
});


