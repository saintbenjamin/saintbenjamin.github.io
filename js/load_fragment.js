/**
 * Load an external HTML fragment and inject it into a target container.
 *
 * This is used for static content blocks (e.g. statements)
 * that do not require structured JSON rendering.
 *
 * MathJax is re-run after insertion to support equations.
 *
 * @param {string} filePath - Path to the HTML file
 * @param {string} divId - Target container ID
 */
function loadExternalHTML(filePath, divId) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      const target = document.getElementById(divId);
      if (!target) return;

      target.innerHTML = data;

      // Re-typeset MathJax if needed
      if (window.MathJax) {
        MathJax.typeset();
      }
    })
    .catch(error => {
      console.error("Error loading external HTML:", error);
    });
}

/**
 * Entry point for loading static HTML sections.
 * Kept separate from JSON-based rendering pipeline.
 */
window.onload = function () {
  loadExternalHTML("statement.html", "self-state");
};