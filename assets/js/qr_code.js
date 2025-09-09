document.addEventListener("DOMContentLoaded", () => {
    const qrType = document.getElementById("qr-type");
    const urlFields = document.getElementById("url-fields");
    const vcardFields = document.getElementById("vcard-fields");
    const qrForm = document.getElementById("qrForm");
    const qrContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("downloadQrBtn");
    let qrCodeStyling;

    // Affichage dynamique des champs selon le type
    qrType.addEventListener("change", function() {
        if (this.value === "url") {
            urlFields.style.display = "block";
            vcardFields.style.display = "none";
        } else {
            urlFields.style.display = "none";
            vcardFields.style.display = "block";
        }
        qrContainer.innerHTML = "";
        downloadBtn.style.display = "none";
    });

    qrForm.addEventListener("submit", function(e) {
        e.preventDefault();
        qrContainer.innerHTML = "";
        downloadBtn.style.display = "none";
        const bgChoice = document.querySelector('input[name="qr-bg"]:checked').value;
        let data = "";
        if (qrType.value === "vcard") {
            const lastname = document.getElementById('lastname').value.trim();
            const firstname = document.getElementById('firstname').value.trim();
            const phone_mobile = document.getElementById('phone_mobile').value.trim();
            const phone_fixe = document.getElementById('phone_fixe').value.trim();
            const website = document.getElementById('website').value.trim();
            const email = document.getElementById('email').value.trim();
            const org = document.getElementById('org').value.trim();
            const title = document.getElementById('title').value.trim();
            const address = document.getElementById('address').value.trim();
            if (!lastname || !firstname) {
                alert("Veuillez entrer le nom et le prénom.");
                return;
            }
            let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            vcard += 'CHARSET=UTF-8\n';
            vcard += `N;CHARSET=UTF-8:${lastname};${firstname};;;\n`;
            vcard += `FN;CHARSET=UTF-8:${firstname} ${lastname}\n`;
            if (address) vcard += `ADR;CHARSET=UTF-8:;;${address};;;;\n`;
            if (phone_mobile) vcard += `TEL;TYPE=CELL:${phone_mobile}\n`;
            if (phone_fixe) vcard += `TEL;TYPE=HOME,VOICE:${phone_fixe}\n`;
            if (email) vcard += `EMAIL;CHARSET=UTF-8:${email}\n`;
            if (org) vcard += `ORG;CHARSET=UTF-8:${org}\n`;
            if (title) vcard += `TITLE;CHARSET=UTF-8:${title}\n`;
            if (website) vcard += `URL:${website}\n`;
            vcard += 'END:VCARD';
            data = vcard;
        } else {
            const url = document.getElementById("url-input").value.trim();
            if (!url) {
                alert("Veuillez entrer une URL valide.");
                return;
            }
            data = url;
        }
        let colorDark = "#181a2a";
        let colorLight = "#fff";
        if (bgChoice === "black") {
            colorDark = "#fff";
            colorLight = "#181a2a";
        }
        qrCodeStyling = new QRCodeStyling({
            width: 220,
            height: 220,
            type: "svg",
            data: data,
            dotsOptions: {
                color: colorDark,
                type: "rounded"
            },
            backgroundOptions: {
                color: colorLight
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 0
            }
        });
        qrCodeStyling.append(qrContainer);
        downloadBtn.style.display = 'inline-block';
    });

    downloadBtn.addEventListener('click', function() {
        if (qrCodeStyling) {
            qrCodeStyling.download({ name: "qrcode", extension: "png" });
        }
    });
});