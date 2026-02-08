/**
 * Handles opening and closing of the QR code overlay.
 *
 * Key design points:
 * - Uses CAPTURE phase for the QR trigger click so that
 *   other global "outside click" handlers cannot intercept it.
 * - Prevents event bubbling to avoid accidental menu/overlay closures.
 * - Allows closing by:
 *   - clicking the close button
 *   - clicking the dark overlay background
 *
 * Assumes:
 * - `.qr-trigger` elements exist in header and/or footer
 * - `#qrOverlay` contains a `.popup` element
 */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("qrOverlay");
  const closeBtn = document.getElementById("closeQrButton");
  if (!overlay || !closeBtn) return;

  /**
   * Open QR overlay.
   * Runs in CAPTURE phase so it fires before any bubbling listeners.
   */
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(".qr-trigger");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation(); // stop bubbling to other click handlers
      overlay.style.display = "flex";
    },
    true // <-- CAPTURE phase
  );

  /**
   * Close overlay via explicit close button.
   */
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    overlay.style.display = "none";
  });

  /**
   * Close overlay when clicking the dark background.
   * (but not when clicking inside the popup)
   */
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });

  /**
   * Prevent clicks inside the popup from bubbling up
   * and triggering overlay close.
   */
  const popup = overlay.querySelector(".popup");
  if (popup) {
    popup.addEventListener("click", (e) => e.stopPropagation());
  }
});