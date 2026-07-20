/* =============================================
   THEME TOGGLE — dark / light mode
   ============================================= */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* =============================================
   ANCHOR LINKS — close mobile nav on click
   ============================================= */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", () => closeNav());
});

/* =============================================
   BACK TO TOP
   ============================================= */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}

/* =============================================
   MOBILE NAV TOGGLE
   ============================================= */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

function closeNav() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });
}

/* =============================================
   ACTIVE NAV — highlight current section
   ============================================= */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("nav a[href^='#']");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.removeAttribute("aria-current"));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.setAttribute("aria-current", "page");
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
