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
                    content: "Tu es une bonne personne qui génère des compliments uniques et différents à chaque fois."
                }, {
                    role: "user",
                    content: `Génère un nouveau compliment pour ma copine Éloïse pour qu'elle ait toujours confiance en elle même quand ça ne vas pas trop. 
                             Le compliment doit être court (maximum 1 phrase), toujours différent des précédents. 
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