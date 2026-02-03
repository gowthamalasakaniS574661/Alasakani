const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

/* Theme */
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
});

/* Mobile Menu */
menuToggle.addEventListener("click", () => {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});


