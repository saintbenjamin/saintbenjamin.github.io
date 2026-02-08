/**
 * Dynamically adjusts <main> padding to account for
 * fixed-position header and footer.
 *
 * This prevents content from being hidden underneath
 * translucent fixed UI elements.
 *
 * Called:
 * - once on DOMContentLoaded
 * - again on window resize (responsive safety)
 */
function adjustMainSpacing() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const main = document.querySelector("main");

  if (!header || !footer || !main) {
    console.error("header, footer, or main element not found");
    return;
  }

  // Measure actual rendered heights (includes padding, responsive changes)
  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;

  // Push content so it starts below header and ends above footer
  main.style.paddingTop = `${headerHeight}px`;
  main.style.paddingBottom = `${footerHeight}px`;
}

/**
 * Initial layout adjustment once DOM is ready.
 */
document.addEventListener("DOMContentLoaded", adjustMainSpacing);

/**
 * Recalculate spacing on resize
 * (e.g. orientation change, responsive header height changes).
 */
window.addEventListener("resize", adjustMainSpacing);