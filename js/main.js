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

if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-controls", "nav-links");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// =======================
// FADE-IN COM INTERSECTION OBSERVER
// =======================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
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
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
  }
});
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// BARRA DE SCROLL DINÂMICA
// =======================
const scrollIndicator = document.createElement("div");
scrollIndicator.classList.add("scroll-indicator");
document.body.appendChild(scrollIndicator);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollIndicator.style.width = scrollPercent + "%";
});

const swiper = new Swiper(".servicos-swiper", {
  loop: true, // Se quiser o loop infinito no mobile, COMENTE 'centeredSlides: true' abaixo.
  slidesPerView: 3,
  spaceBetween: 30,
  // === ADICIONE ESTE BLOCO DE VOLTA ===
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // =================================

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1200: { slidesPerView: 3, spaceBetween: 30 },
    992: { slidesPerView: 2, spaceBetween: 20 },
    768: {
      slidesPerView: 1.1,
      spaceBetween: 15,
      centeredSlides: true, // MANTENHA para a centralização perfeita // Removido loop: false
    },
    480: {
      slidesPerView: 1.1,
      spaceBetween: 15,
      centeredSlides: true, // Removido loop: false
    },
    360: {
      slidesPerView: 1.1,
      spaceBetween: 15,
      centeredSlides: true, // Removido loop: false
    },
  },
});
