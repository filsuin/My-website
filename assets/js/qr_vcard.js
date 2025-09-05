document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vcardForm');
    const qrContainer = document.getElementById('qrcode');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const org = document.getElementById('org').value.trim();
        const title = document.getElementById('title').value.trim();

        // Générer le texte vCard
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        if (name) vcard += `FN:${name}\n`;
        if (org) vcard += `ORG:${org}\n`;
        if (title) vcard += `TITLE:${title}\n`;
        if (phone) vcard += `TEL;TYPE=CELL:${phone}\n`;
        if (email) vcard += `EMAIL:${email}\n`;
        vcard += 'END:VCARD';

        // Nettoyer l'ancien QR
        qrContainer.innerHTML = '';
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
