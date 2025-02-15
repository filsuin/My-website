document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Définir le thème sombre par défaut si aucun thème n'est stocké
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        // Appliquer le thème stocké
        const currentTheme = localStorage.getItem('theme');
        document.documentElement.setAttribute('data-theme', currentTheme);
        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
});