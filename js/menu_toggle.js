/**
 * Mobile hamburger menu controller.
 *
 * Responsibilities:
 * - Toggle the `.open` class on the menu element.
 * - Synchronize `aria-expanded` on the hamburger button.
 * - Close the menu automatically when a menu link is clicked.
 *
 * This implementation avoids duplicate event listeners
 * and is suitable for single-page navigation.
 */

function toggleMenu(forceOpen) {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  if (!menu || !hamburger) return;

  const shouldOpen =
    typeof forceOpen === "boolean"
      ? forceOpen
      : !menu.classList.contains("open");

  menu.classList.toggle("open", shouldOpen);
  hamburger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  hamburger.classList.toggle("open", shouldOpen);
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (!hamburger || !menu) return;

  // Toggle menu when the hamburger button is clicked
  hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Close menu when any internal navigation link is clicked
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Optional: close the menu when the Escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });
});