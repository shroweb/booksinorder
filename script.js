const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll(".parallax");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.speed || 0);
      item.style.translate = `0 ${window.scrollY * speed}px`;
    });
  },
  { passive: true }
);
