document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    if (url) {
        generateQRCode(url);
    }
});

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = '';
    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: 256,
        height: 256,
    });

    setTimeout(() => {
        const qrCodeImage = qrCodeContainer.querySelector('img');
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = qrCodeImage.src;
    }, 300); // Réduire le délai pour une meilleure réactivité
}