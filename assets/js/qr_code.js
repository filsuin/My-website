document.addEventListener("DOMContentLoaded", () => {
    const downloadLink = document.getElementById("download-link");
    downloadLink.style.display = "none"; // Initial state

    // Ajout gestion du type QR
    const qrType = document.getElementById("qr-type");
    const urlForm = document.getElementById("qr-url-form");
    const vcardForm = document.getElementById("qr-vcard-form");
    if (qrType) {
        qrType.addEventListener("change", function() {
            if (this.value === "url") {
                urlForm.style.display = "block";
                vcardForm.style.display = "none";
            } else {
                urlForm.style.display = "none";
                vcardForm.style.display = "block";
            }
        });
    }

    document.getElementById("generate-btn").addEventListener("click", function () {
        const bgChoice = document.querySelector('input[name="qr-bg"]:checked').value;
        let text = "";
        if (qrType && qrType.value === "vcard") {
            // vCard
            const lastname = document.getElementById('lastname').value.trim();
            const firstname = document.getElementById('firstname').value.trim();
            const phone_mobile = document.getElementById('phone_mobile').value.trim();
            const phone_fixe = document.getElementById('phone_fixe').value.trim();
            const email = document.getElementById('email').value.trim();
            const org = document.getElementById('org').value.trim();
            const title = document.getElementById('title').value.trim();
            const website = document.getElementById('website').value.trim();
            const address = document.getElementById('address').value.trim();
            if (!lastname || !firstname) {
                alert("Veuillez entrer le nom et le prénom.");
                return;
            }
            let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            vcard += `N:${lastname};${firstname};;;\n`;
            vcard += `FN:${firstname} ${lastname}\n`;
            if (org) vcard += `ORG:${org}\n`;
            if (title) vcard += `TITLE:${title}\n`;
            if (phone_mobile) vcard += `TEL;TYPE=CELL:${phone_mobile}\n`;
            if (phone_fixe) vcard += `TEL;TYPE=HOME,VOICE:${phone_fixe}\n`;
            if (email) vcard += `EMAIL:${email}\n`;
            if (website) vcard += `URL:${website}\n`;
            if (address) vcard += `ADR;TYPE=WORK:${address}\n`;
            vcard += 'END:VCARD';
            text = vcard;
        } else {
            // URL
            const url = document.getElementById("url-input").value;
            if (!url) {
                alert("Veuillez entrer une URL valide.");
                return;
            }
            text = url;
        }

        const qrCodeContainer = document.getElementById("qr-code");
        qrCodeContainer.innerHTML = ""; // Clear previous QR code

        // Définir les couleurs selon le choix
        let colorDark = "#000000";
        let colorLight = "#ffffff";
        if (bgChoice === "black") {
            colorDark = "#ffffff";
            colorLight = "#000000";
        }

        new QRCode(qrCodeContainer, {
            text: text,
            width: 256,
            height: 256,
            colorDark: colorDark,
            colorLight: colorLight
        });

        // Show download link after QR code generation
        setTimeout(() => {
            const qrCodeImage = qrCodeContainer.querySelector("img");
            if (qrCodeImage) {
                downloadLink.href = qrCodeImage.src;
                downloadLink.style.display = "block";
            }
        }, 500);
    });
});