function adjustMainSpacing() {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    if (header && footer && main) {
      const headerHeight = header.offsetHeight;
      const footerHeight = footer.offsetHeight;

      main.style.paddingTop = `${headerHeight}px`;
      main.style.paddingBottom = `${footerHeight}px`;
    } else {
      console.error("header, footer, or main element not found");
    }
}
document.addEventListener("DOMContentLoaded", adjustMainSpacing);
window.addEventListener("resize", adjustMainSpacing);