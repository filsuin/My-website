document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vcardForm');
    const qrContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadQrBtn');

    let qrCodeStyling;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
    qrContainer.innerHTML = '';
    downloadBtn.style.display = 'none';
    const lastname = document.getElementById('lastname').value.trim();
    const firstname = document.getElementById('firstname').value.trim();
    const phone_mobile = document.getElementById('phone_mobile').value.trim();
    const phone_fixe = document.getElementById('phone_fixe').value.trim();
    const website = document.getElementById('website').value.trim();
    const email = document.getElementById('email').value.trim();
    const org = document.getElementById('org').value.trim();
    const title = document.getElementById('title').value.trim();
    const address = document.getElementById('address').value.trim();

        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        vcard += 'CHARSET=UTF-8\n';
        if (lastname && firstname) {
            vcard += `N;CHARSET=UTF-8:${lastname};${firstname};;;\n`;
            vcard += `FN;CHARSET=UTF-8:${firstname} ${lastname}\n`;
        } else if (lastname) {
            vcard += `N;CHARSET=UTF-8:${lastname};;;;\n`;
            vcard += `FN;CHARSET=UTF-8:${lastname}\n`;
        }
        if (address) vcard += `ADR;CHARSET=UTF-8:;;${address};;;;\n`;
        if (phone_mobile) vcard += `TEL;TYPE=CELL:${phone_mobile}\n`;
        if (phone_fixe) vcard += `TEL;TYPE=HOME,VOICE:${phone_fixe}\n`;
        if (email) vcard += `EMAIL;CHARSET=UTF-8:${email}\n`;
        if (org) vcard += `ORG;CHARSET=UTF-8:${org}\n`;
        if (title) vcard += `TITLE;CHARSET=UTF-8:${title}\n`;
        if (website) vcard += `URL:${website}\n`;
        vcard += 'END:VCARD';

        // Utilisation de qr-code-styling
    qrCodeStyling = new QRCodeStyling({
            width: 220,
            height: 220,
            type: "svg",
            data: vcard,
            dotsOptions: {
                color: "#181a2a",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#fff"
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
            qrCodeStyling.download({ name: "vcard_qrcode", extension: "png" });
        }
    });
});
