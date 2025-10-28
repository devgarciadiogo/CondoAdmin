// =======================
// HERO VIDEO LOOP (otimizado)
// =======================
const video = document.getElementById("heroVideo");
if (video) {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
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
// STICKY HEADER, BACK-TO-TOP E SCROLL INDICATOR (unificado)
// =======================
const header = document.querySelector("header");
const backToTop = document.getElementById("back-to-top");

// Cria a barra de scroll se ainda não existir
let scrollIndicator = document.querySelector(".scroll-indicator");
if (!scrollIndicator) {
  scrollIndicator = document.createElement("div");
  scrollIndicator.classList.add("scroll-indicator");
  document.body.appendChild(scrollIndicator);
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Sticky header
    header?.classList.toggle("scrolled", scrollY > 10);

    // Back to top
    if (backToTop) backToTop.style.display = scrollY > 300 ? "flex" : "none";

    // Scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.width = (scrollY / docHeight) * 100 + "%";
    }
  });
});

if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// SWIPER SERVIÇOS
// =======================
const swiper = new Swiper(".servicos-swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
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
      centeredSlides: true,
    },
    480: {
      slidesPerView: 1.1,
      spaceBetween: 15,
      centeredSlides: true,
    },
    360: {
      slidesPerView: 1.1,
      spaceBetween: 15,
      centeredSlides: true,
    },
  },
});

// =======================
// FORMULÁRIO COM FEEDBACK (Web3Forms)
// =======================

const form = document.getElementById("contatoForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede envio imediato

    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    // Remove mensagens antigas
    const oldMessage = document.getElementById("form-message");
    if (oldMessage) oldMessage.remove();

    // Cria elemento de mensagem
    const messageEl = document.createElement("p");
    messageEl.id = "form-message";
    messageEl.style.marginTop = "10px";
    messageEl.style.fontWeight = "bold";

    form.appendChild(messageEl);

    // Mostra status "Enviando..."
    submitButton.disabled = true;
    submitButton.textContent = "Enviando... ⏳";

    // Verifica se o formulário é válido
    if (form.checkValidity()) {
      // Envia o formulário usando fetch para Web3Forms
      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(async (response) => {
          if (response.ok) {
            messageEl.textContent = "Mensagem enviada! ✅";
            messageEl.style.color = "green";
            form.reset();
          } else {
            const data = await response.json().catch(() => ({}));
            messageEl.textContent =
              "Erro ao enviar ❌. Tente novamente mais tarde.";
            messageEl.style.color = "red";
            console.error("Erro do servidor:", data);
          }
        })
        .catch((error) => {
          messageEl.textContent =
            "Erro ao enviar ❌. Verifique sua conexão e tente novamente.";
          messageEl.style.color = "red";
          console.error("Erro ao enviar:", error);
        })
        .finally(() => {
          // Volta botão ao normal
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 2000);
        });
    } else {
      // Erro: algum campo está inválido
      messageEl.textContent =
        "Erro ao enviar ❌. Preencha todos os campos corretamente.";
      messageEl.style.color = "red";

      // Volta botão ao normal
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 2000);
    }
  });
}
