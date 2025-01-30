document.addEventListener("DOMContentLoaded", () => {
    const downloadLink = document.getElementById("download-link");
    downloadLink.style.display = "none"; // Initial state

    document.getElementById("generate-btn").addEventListener("click", function () {
        const url = document.getElementById("url-input").value;

        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        const qrCodeContainer = document.getElementById("qr-code");
        qrCodeContainer.innerHTML = ""; // Clear previous QR code

        new QRCode(qrCodeContainer, {
            text: url,
            width: 256,
            height: 256,
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