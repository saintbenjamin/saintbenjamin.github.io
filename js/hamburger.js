function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });                
}