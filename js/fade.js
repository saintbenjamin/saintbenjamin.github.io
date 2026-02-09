/**
 * Applies a fade-in animation to elements when they enter the viewport,
 * and resets the animation when they leave the viewport.
 *
 * Behavior:
 * - Elements with the `.fade-in` class are observed using IntersectionObserver.
 * - When an element becomes visible (intersection threshold met),
 *   the `visible` class is added to trigger the CSS transition.
 * - When the element leaves the viewport,
 *   the `visible` class is removed, resetting it to the hidden state.
 *
 * This allows the fade-in animation to replay each time the element
 * re-enters the viewport.
 *
 * Requirements:
 * - Elements must define their initial hidden state in CSS via `.fade-in`.
 * - The visible state must be defined via `.fade-in.visible`.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Collect all elements that should participate in the fade-in effect
  const fadeIns = document.querySelectorAll(".fade-in");

  // Create an IntersectionObserver to track visibility changes
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When the element enters the viewport
        if (entry.isIntersecting) {
          // Activate the fade-in animation
          entry.target.classList.add("visible");
        } else {
          // Reset to the hidden state when leaving the viewport
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      // Trigger when at least 10% of the element is visible
      threshold: 0.01,
    }
  );

  // Register each fade-in element with the observer
  fadeIns.forEach((el) => observer.observe(el));
});