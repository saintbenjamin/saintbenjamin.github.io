const showQrButton = document.getElementById('showQrButton');
const qrOverlay = document.getElementById('qrOverlay');
const closeQrButton = document.getElementById('closeQrButton');
showQrButton.addEventListener('click', () => {
  qrOverlay.style.display = 'flex';
});
closeQrButton.addEventListener('click', () => {
  qrOverlay.style.display = 'none';
});
qrOverlay.addEventListener('click', (e) => {
  if (e.target === qrOverlay) {
    qrOverlay.style.display = 'none';
  }
});