/* =============================================
   SMOOTH SCROLL — anchor links
   ============================================= */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return; // allow logo link to reload top
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // close mobile nav if open
      closeNav();
    }
  });
});

/* =============================================
   BACK TO TOP — show/hide + click handler (bug fix)
   ============================================= */
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =============================================
   MOBILE NAV TOGGLE
   ============================================= */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

function closeNav() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  // Restore hamburger lines
  const spans = navToggle.querySelectorAll("span");
  spans[0].style.transform = "";
  spans[1].style.transform = "";
  spans[1].style.opacity  = "";
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));

    // Animate hamburger → X
    const spans = navToggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.transform = "translateY(-0px) rotate(-45deg)";
    } else {
      closeNav();
    }
  });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });
}

/* =============================================
   SCROLL REVEAL — IntersectionObserver
   ============================================= */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(el => observer.observe(el));

/* =============================================
   HEADER — add shadow on scroll
   ============================================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";
  } else {
    header.style.boxShadow = "none";
  }
}, { passive: true });
