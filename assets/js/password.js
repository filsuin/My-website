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