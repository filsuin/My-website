
function generatePassword() {
    const length = document.getElementById('length').value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (includeLowercase) allChars += lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSpecial) allChars += specialChars;

    if (allChars === '') {
        document.getElementById('passwordResult').textContent = '';
        updatePasswordStrength('');
        document.getElementById('copyButton').style.display = 'none';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById('passwordResult').textContent = password;
    updatePasswordStrength(password);
    document.getElementById('copyButton').style.display = 'inline-block';
}

['length', 'lowercase', 'uppercase', 'numbers', 'special'].forEach(id => {
    document.getElementById(id).addEventListener('input', generatePassword);
    document.getElementById(id).addEventListener('change', generatePassword);
});

window.addEventListener('DOMContentLoaded', generatePassword);


document.getElementById('copyButton').addEventListener('click', function() {
    const passwordResult = document.getElementById('passwordResult').textContent;
    if (!passwordResult) return;
    navigator.clipboard.writeText(passwordResult).then(function() {
        alert('Mot de passe copié dans le presse-papiers!');
    }, function(err) {
        alert('Erreur lors de la copie du mot de passe: ', err);
    });
});

function updatePasswordStrength(password) {
    const result = zxcvbn(password);
    const strengthProgress = document.getElementById('strengthProgress');
    const strengthText = document.getElementById('strengthText');
    
    // Score va de 0 à 4
    const score = result.score;
    let strength, color;
    
    switch(score) {
        case 0:
            strength = 'Très faible';
            color = '#ff0000';
            break;
        case 1:
            strength = 'Faible';
            color = '#ff4d4d';
            break;
        case 2:
            strength = 'Moyen';
            color = '#ffd700';
            break;
        case 3:
            strength = 'Fort';
            color = '#90EE90';
            break;
        case 4:
            strength = 'Très fort';
            color = '#00ff00';
            break;
    }
    
    strengthProgress.style.width = `${(score + 1) * 20}%`;
    strengthProgress.style.backgroundColor = color;
    strengthText.textContent = strength;
    strengthText.style.color = color;
}