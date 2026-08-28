/**
 * RecNes Portfolio - main.js
 */

// --- Header Scroll Behavior ---
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

// --- Mobile Menu ---
const menuBtn = document.getElementById("menu-btn");
const mainNav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mainNav.classList.toggle("open");
  document.body.style.overflow = mainNav.classList.contains("open") ? "hidden" : "";
});

mainNav.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mainNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// --- Active Nav on Scroll ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link[data-section]");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.section === id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(sec => sectionObserver.observe(sec));

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// --- Stagger children inside reveal containers ---
document.querySelectorAll(".reveal-group").forEach(group => {
  const children = group.querySelectorAll(".reveal-child");
  const groupObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add("visible"), i * 120);
      });
      groupObserver.unobserve(group);
    }
  }, { threshold: 0.05 });
  groupObserver.observe(group);
});
