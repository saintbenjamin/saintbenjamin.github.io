/**
 * Toggles the mobile hamburger menu open/closed state.
 * 
 * - Adds or removes the `.open` class on the menu element.
 * - When any menu link is clicked, the menu automatically closes.
 * 
 * This behavior is intended for single-page navigation,
 * so the menu collapses immediately after a section jump.
 */
function toggleMenu() {
  // Select the main navigation menu
  const menu = document.querySelector('.menu');
  if (!menu) return;

  // Toggle the open/closed state
  menu.classList.toggle('open');

  // Close the menu when any internal link is clicked
  const menuItems = document.querySelectorAll('.menu a');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}