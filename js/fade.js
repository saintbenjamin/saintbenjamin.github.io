/**
 * Applies a fade-in animation to elements when they enter the viewport.
 *
 * Elements must:
 *   - have the class `.fade-in`
 *   - define their initial hidden state in CSS
 *
 * Once an element becomes visible:
 *   - the `visible` class is added
 *   - the observer stops tracking that element (one-shot animation)
 */
document.addEventListener("DOMContentLoaded", () => {
  // Collect all elements that should fade in
  const fadeIns = document.querySelectorAll(".fade-in");

  // Observer configuration:
  // Trigger when at least 10% of the element is visible
  const options = {
    threshold: 0.1,
  };

  // IntersectionObserver callback
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // When the element enters the viewport
      if (entry.isIntersecting) {
        // Activate fade-in animation
        entry.target.classList.add("visible");

        // Stop observing after first trigger
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Register all fade-in elements with the observer
  fadeIns.forEach(el => observer.observe(el));
});