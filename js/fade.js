/**
 * Fade-in controller using IntersectionObserver.
 *
 * Supports dynamic content:
 * - Exposes `window.refreshFadeIns()` so newly added `.fade-in` elements
 *   (e.g., rendered after fetch) can be observed at any time.
 *
 * Behavior:
 * - When an element enters the viewport, `visible` is added.
 * - When it leaves, `visible` is removed (so the animation can replay).
 *
 * Requirements:
 * - `.fade-in` defines the hidden initial state in CSS.
 * - `.fade-in.visible` defines the visible state in CSS.
 */

(() => {
  /** @type {IntersectionObserver|null} */
  let observer = null;

  /**
   * Observe all `.fade-in` elements currently in the DOM.
   * Safe to call repeatedly.
   */
  function refreshFadeIns() {
    if (!observer) return;

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  }

  // Make the refresh hook available globally for loader/render pipelines.
  window.refreshFadeIns = refreshFadeIns;

  document.addEventListener("DOMContentLoaded", () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.02,
      }
    );

    // Observe any `.fade-in` elements that already exist at load time.
    refreshFadeIns();
  });
})();