document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');

    if (menuToggle && navButtons) {
        menuToggle.addEventListener('click', function() {
            navButtons.classList.toggle('active');
            console.log('Menu clicked'); // For debugging
        });
    }
});