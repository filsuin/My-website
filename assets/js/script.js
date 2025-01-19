document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file");
    const formatSelect = document.getElementById("format");
    const form = document.getElementById("convertForm");
    const previewContainer = document.getElementById("previewContainer");
    const downloadLink = document.getElementById("downloadLink");

    // Fonction pour afficher l'image en prévisualisation
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            const preview = document.createElement("img");
            preview.src = URL.createObjectURL(file);
            preview.style.maxWidth = "100%";
            preview.style.marginTop = "15px";

            const oldPreview = document.querySelector(".preview");
            if (oldPreview) oldPreview.remove();

            preview.className = "preview";
            previewContainer.appendChild(preview);
        }
    });

    // Fonction pour convertir et télécharger l'image
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert("Veuillez sélectionner une image à convertir.");
            return;
        }

        const format = formatSelect.value;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // Créer un canvas pour effectuer la conversion
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Ajuster les dimensions du canvas en fonction de l'image
                canvas.width = img.width;
                canvas.height = img.height;

                // Dessiner l'image sur le canvas
                ctx.drawImage(img, 0, 0);

                // Convertir l'image dans le format sélectionné
                let imageURL;
                switch (format) {
                    case "jpeg":
                        imageURL = canvas.toDataURL("image/jpeg");
                        break;
                    case "png":
                        imageURL = canvas.toDataURL("image/png");
                        break;
                    case "bmp":
                        imageURL = canvas.toDataURL("image/bmp");
                        break;
                    case "gif":
                        imageURL = canvas.toDataURL("image/gif");
                        break;
                    case "tiff":
                        imageURL = canvas.toDataURL("image/tiff");
                        break;
                    default:
                        imageURL = canvas.toDataURL("image/png");
                }

                // Vérification de l'URL de l'image
                if (!imageURL) {
                    alert("La conversion de l'image a échoué.");
                    return;
                }

                // Créer le lien de téléchargement
                downloadLink.href = imageURL;
                downloadLink.style.display = "inline-block";
                downloadLink.download = `image_convertie.${format}`;
            };

            img.onerror = function () {
                alert("Une erreur est survenue lors du chargement de l'image.");
            };
        };

        reader.readAsDataURL(file);
    });

    document.getElementById("qrForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const url = document.getElementById("url").value;
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;

        if (!url) {
            alert("Veuillez entrer une URL valide.");
            return;
        }

        const qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = ""; // Clear previous QR code

        const qrcode = new QRCode(qrcodeContainer, {
            text: url,
            width: size * 10, // Adjust size
            height: size * 10, // Adjust size
            colorDark: color,
            colorLight: "#ffffff",
        });

        // Show download link
        const downloadLink = document.getElementById("downloadLink");
        setTimeout(() => {
            const qrCanvas = qrcodeContainer.querySelector("canvas");
            if (qrCanvas) {
                downloadLink.href = qrCanvas.toDataURL("image/png");
                downloadLink.style.display = "inline-block";
            }
        }, 500); // Wait for QR code to be generated
    });

    document.getElementById("generateButton").addEventListener("click", function () {
        const url = document.getElementById("url").value;
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;

        if (!url) {
            alert("Veuillez entrer une URL valide.");
            return;
        }

        const qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = ""; // Clear previous QR code

        const qrcode = new QRCode(qrcodeContainer, {
            text: url,
            width: size * 10, // Adjust size
            height: size * 10, // Adjust size
            colorDark: color,
            colorLight: "#ffffff",
        });

        // Show download link
        const downloadLink = document.getElementById("downloadLink");
        setTimeout(() => {
            const qrCanvas = qrcodeContainer.querySelector("canvas");
            if (qrCanvas) {
                downloadLink.href = qrCanvas.toDataURL("image/png");
                downloadLink.style.display = "inline-block";
            }
        }, 500); // Wait for QR code to be generated
    });
});