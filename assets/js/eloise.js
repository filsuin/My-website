document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le thème sauvegardé ou utiliser 'light' par défaut
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Fonction pour créer des cœurs flottants
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Position horizontale aléatoire
    heart.style.left = `${Math.random() * 95}%`;
    // Position de départ verticale aléatoire
    heart.style.bottom = '0';
    // Rotation initiale aléatoire
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Vitesse de déplacement aléatoire
    const duration = 4 + Math.random() * 2;
    heart.style.animation = `float ${duration}s linear`;
    
    // Taille aléatoire
    const size = 20 + Math.random() * 15;
    heart.style.fontSize = `${size}px`;
    
    document.querySelector('.hearts-animation').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Ajuster l'intervalle pour une meilleure distribution
setInterval(createFloatingHeart, 400);

// Gestion des compliments
document.getElementById('complimentBtn').addEventListener('click', async function() {
    const complimentResult = document.getElementById('complimentResult');
    complimentResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération en cours...';

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [{
                    role: "system",
                    content: "Tu es une bonne personne créative qui ne se répète jamais et qui génère des compliments uniques et différents à chaque fois."
                }, {
                    role: "user",
                    content: `Génère un nouveau compliment pour ma copine Éloïse pour qu'elle ait toujours confiance en elle même quand ça ne vas pas trop. 
                             Le compliment doit être court (maximum 1 phrase),
                             Timestamp: ${Date.now()}`
                }],
                temperature: 0.9,
                max_tokens: 100
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        // Animation de transition
        complimentResult.style.opacity = '0';
        setTimeout(() => {
            complimentResult.innerHTML = data.choices[0].message.content.trim();
            complimentResult.style.opacity = '1';
        }, 300);

    } catch (error) {
        console.error('Error:', error);
        complimentResult.innerHTML = "Désolé, une erreur s'est produite. Mais tu restes la plus belle à mes yeux ! ❤️";
    }
});