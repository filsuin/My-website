document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vcardForm');
    const qrContainer = document.getElementById('qrcode');

    // Vérification de la présence de QRCode
    if (typeof QRCode === 'undefined') {
        qrContainer.innerHTML = '<div style="color:red;">Erreur : La librairie QRCodeJS n\'est pas chargée.</div>';
        return;
    }

    // Forcer le conteneur à être visible pour le test
    qrContainer.style.minWidth = '220px';
    qrContainer.style.minHeight = '220px';
    qrContainer.style.background = '#fff';
    qrContainer.style.display = 'inline-block';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Nettoyer l'ancien QR et ses éventuels doublons
        qrContainer.innerHTML = '';
        // Récupérer les valeurs du formulaire
        const lastname = document.getElementById('lastname').value.trim();
        const firstname = document.getElementById('firstname').value.trim();
        const phone_mobile = document.getElementById('phone_mobile').value.trim();
        const phone_fixe = document.getElementById('phone_fixe').value.trim();
        const website = document.getElementById('website').value.trim();
        const email = document.getElementById('email').value.trim();
        const org = document.getElementById('org').value.trim();
        const title = document.getElementById('title').value.trim();

        // Générer le texte vCard (infos principales d'abord)
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        if (lastname && firstname) {
            vcard += `N:${lastname};${firstname};;;\n`;
            vcard += `FN:${firstname} ${lastname}\n`;
        } else if (lastname) {
            vcard += `N:${lastname};;;;\n`;
            vcard += `FN:${lastname}\n`;
        }
        if (phone_mobile) vcard += `TEL;TYPE=CELL:${phone_mobile}\n`;
        if (phone_fixe) vcard += `TEL;TYPE=HOME,VOICE:${phone_fixe}\n`;
        if (email) vcard += `EMAIL:${email}\n`;
        if (org) vcard += `ORG:${org}\n`;
        if (title) vcard += `TITLE:${title}\n`;
        if (website) vcard += `URL:${website}\n`;
        vcard += 'END:VCARD';

        // Générer le QR code
        new QRCode(qrContainer, {
            text: vcard,
            width: 220,
            height: 220,
            colorDark: '#181a2a',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
        });
    });
});
