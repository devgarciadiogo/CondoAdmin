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
// HERO PARALLAX (SOMENTE HOMEPAGE)
// =======================
if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/"
) {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    window.addEventListener("scroll", () => {
      heroContent.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
  }
}

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
// CARROSSEL DE SERVIÇOS
// =======================
const carrossel = document.querySelector(".carrossel-servicos");
if (carrossel) {
  const wrapper = carrossel.querySelector(".cards-wrapper");
  const prevBtn = carrossel.querySelector(".carrossel-btn.prev");
  const nextBtn = carrossel.querySelector(".carrossel-btn.next");

  let isDown = false;
  let startX;
  let scrollLeft;

  // Drag com mouse
  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wrapper.classList.add("active");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });
  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
    wrapper.classList.remove("active");
  });
  wrapper.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.classList.remove("active");
  });
  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // Botões de navegação
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: wrapper.offsetWidth, behavior: "smooth" });
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: -wrapper.offsetWidth, behavior: "smooth" });
    });
  }

  // Touch support
  let touchStartX = 0;
  let touchScrollLeft = 0;

  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchX - touchStartX) * 2;
    wrapper.scrollLeft = touchScrollLeft - walk;
  });
}
