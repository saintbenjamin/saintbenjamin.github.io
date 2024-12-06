// Wait for the page to load before changing the background image
window.addEventListener('load', function() {
    // Set the background image after the page has loaded
    document.body.style.backgroundImage = "url('img/sop.jpg')";
});

// Get the text element
const fadeInText = document.querySelector('.fade-in-text');

// Function to check if the element is in view
function checkScroll() {
    const rect = fadeInText.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75) {
        fadeInText.classList.add('visible');
    }
}

// Listen to scroll event
window.addEventListener('scroll', checkScroll);

// Initial check in case the page is already scrolled
checkScroll();