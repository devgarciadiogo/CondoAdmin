// =======================
// HERO VIDEO LOOP
// =======================
const video = document.getElementById("heroVideo");
if (video) {
  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= video.duration - 0.2) {
      video.currentTime = 0;
      video.play();
    }
  });
}

// =======================
// MENU TOGGLE / HAMBURGER
// =======================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar .nav-links");

// Define atributos ARIA iniciais
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-controls", "nav-links");

// Toggle menu com animação do hamburger -> X
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuToggle.classList.toggle("open"); // anima o X
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Fecha o menu ao clicar em algum link (mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// =======================
// FADE-IN COM INTERSECTION OBSERVER
// =======================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // anima apenas uma vez
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => observer.observe(el));

// =======================
// SMOOTH SCROLL PARA ÂNCORAS
// =======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =======================
// HERO PARALLAX
// =======================
const heroContent = document.querySelector(".hero-content");
window.addEventListener("scroll", () => {
  if (heroContent) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.5}px)`;
  }
});

// =======================
// STICKY HEADER SHADOW
// =======================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// =======================
// BOTÃO VOLTAR AO TOPO
// =======================
const backToTop = document.getElementById("back-to-top"); // já existe no HTML
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
