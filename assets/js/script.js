document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navButtons = document.querySelector('.nav-buttons');

    mobileMenu.addEventListener('click', function() {
        navButtons.classList.toggle('active');
        // Changer l'icône du menu
        const icon = this.querySelector('i');
        if (navButtons.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-buttons a').forEach(link => {
        link.addEventListener('click', () => {
            navButtons.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

