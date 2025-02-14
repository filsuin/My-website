// Fonction pour créer des cœurs flottants
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    document.querySelector('.hearts-animation').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Créer des cœurs toutes les 300ms
setInterval(createFloatingHeart, 300);

// Gestion des compliments
document.getElementById('complimentBtn').addEventListener('click', async function() {
    const complimentResult = document.getElementById('complimentResult');
    complimentResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération en cours...';

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Génère un compliment romantique, poétique et sincère en français pour ma copine Éloïse.",
                max_tokens: 100,
                temperature: 0.7
            })
        });

        const data = await response.json();
        complimentResult.innerHTML = data.choices[0].text.trim();
        complimentResult.style.animation = 'none';
        complimentResult.offsetHeight; // Force reflow
        complimentResult.style.animation = null;
    } catch (error) {
        complimentResult.innerHTML = "Désolé, une erreur s'est produite. Mais tu restes la plus belle à mes yeux ! ❤️";
    }
});