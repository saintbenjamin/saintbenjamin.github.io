function toggleMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  menu.classList.toggle("open");

  const menuItems = document.querySelectorAll(".menu a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}