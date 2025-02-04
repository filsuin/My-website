document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

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
        alert('Veuillez sélectionner au moins un type de caractère.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    const passwordResult = document.getElementById('passwordResult');
    passwordResult.textContent = password;

    // Mettre à jour la force du mot de passe
    updatePasswordStrength(password);

    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'inline-block';
});

document.getElementById('copyButton').addEventListener('click', function() {
    const passwordResult = document.getElementById('passwordResult').textContent;
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