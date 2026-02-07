document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("qrOverlay");
  const closeBtn = document.getElementById("closeQrButton");

  // Grab QR clicks in CAPTURE phase so other "outside click" handlers can't steal it
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(".qr-trigger");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation(); // stop bubbling
      overlay.style.display = "flex";
    },
    true // <-- CAPTURE!
  );

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });

  // Optional: prevent clicks inside popup from closing the overlay
  const popup = overlay.querySelector(".popup");
  if (popup) {
    popup.addEventListener("click", (e) => e.stopPropagation());
  }
});