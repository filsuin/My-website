// Compte à Rebours
const countdown = document.getElementById('countdown');
const christmas = new Date('Dec 25, 2024 00:00:00').getTime();

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = christmas - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(interval);
        countdown.innerHTML = "Joyeux Noël !";
    }
}, 1000);

// Effets Visuels - Neige qui tombe
const numberOfSnowflakes = 50;
const snowflakes = document.querySelector('.snowflakes');

for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❅';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflakes.appendChild(snowflake);
}

// Fonction pour formater la liste au Père Noël
function formatWishlist() {
    const textarea = document.getElementById('wishlist');
    const lines = textarea.value.split('\n');
    textarea.value = lines.map((line, index) => {
        if (line.trim() && !line.startsWith('• ')) {
            return `• ${line.trim()}`;
        }
        return line;
    }).join('\n');
}

// Fonction pour envoyer la liste au Père Noël
function sendWishlist() {
    const wishlist = document.getElementById('wishlist').value;
    if (wishlist.trim() === '') {
        alert('Veuillez écrire quelque chose pour le Père Noël.');
        return;
    }

    const letter = document.createElement('div');
    letter.className = 'letter';
    letter.textContent = '📜';
    document.body.appendChild(letter);

    // Jouer le son du Père Noël qui rit
    const santaLaugh = document.getElementById('santaLaugh');
    santaLaugh.play();

    setTimeout(() => {
        letter.remove();
        alert('Votre liste a été envoyée au Père Noël !');
    }, 2000);
}