/* =============================================
   MOBILE NAV TOGGLE
   ============================================= */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

function closeNav() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  const spans = navToggle.querySelectorAll("span");
  spans[0].style.transform = "";
  spans[1].style.transform = "";
  spans[1].style.opacity  = "";
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    const spans = navToggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.transform = "translateY(-0px) rotate(-45deg)";
    } else {
      closeNav();
    }
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });
}

/* =============================================
   HEADER — shadow on scroll
   ============================================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";
  } else {
    header.style.boxShadow = "none";
  }
}, { passive: true });

/* =============================================
   BACK TO TOP
   ============================================= */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
