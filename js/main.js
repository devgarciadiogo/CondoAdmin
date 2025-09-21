// Seleciona os elementos
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar .nav-links");

// Define atributos ARIA iniciais
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-controls", "nav-links");

// Ao clicar no menu toggle
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show"); // Adiciona/remove a classe 'show'
  menuToggle.setAttribute("aria-expanded", isOpen); // Atualiza o estado
});

// Fecha o menu ao clicar em algum link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false"); // Garante atualização
    }
  });
});

// Seleciona todos os elementos com a classe fade-in
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
