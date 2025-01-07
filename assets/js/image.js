document.getElementById('convertForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const formatSelect = document.getElementById('format');
    const qualityInput = document.getElementById('quality');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const previewContainer = document.getElementById('previewContainer');
    const sizeEstimate = document.getElementById('sizeEstimate');
    const downloadLink = document.getElementById('downloadLink');

    const file = fileInput.files[0];
    const format = formatSelect.value;
    const quality = qualityInput.value / 100;
    const width = widthInput.value;
    const height = heightInput.value;

    if (!file) {
        alert('Veuillez télécharger une image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let newWidth = img.width;
            let newHeight = img.height;

            if (width) {
                newWidth = width;
                newHeight = (img.height / img.width) * width;
            }

            if (height) {
                newHeight = height;
                newWidth = (img.width / img.height) * height;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            let mimeType;
            switch (format) {
                case 'jpeg':
                case 'jpg':
                    mimeType = 'image/jpeg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    break;
                case 'bmp':
                    mimeType = 'image/bmp';
                    break;
                case 'gif':
                    mimeType = 'image/gif';
                    break;
                case 'tiff':
                    mimeType = 'image/tiff';
                    break;
                case 'ico':
                    mimeType = 'image/x-icon';
                    break;
                case 'webp':
                    mimeType = 'image/webp';
                    break;
                default:
                    mimeType = 'image/png';
            }

            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = `converted_image.${format}`;
                downloadLink.style.display = 'block';
                previewContainer.innerHTML = '';
                const imgPreview = document.createElement('img');
                imgPreview.src = url;
                imgPreview.alt = 'Image convertie';
                previewContainer.appendChild(imgPreview);

                // Estimation de la taille de l'image
                const estimatedSize = (blob.size / 1024).toFixed(2); // Taille en Ko
                sizeEstimate.textContent = `Estimation de la taille de l'image : ${estimatedSize} Ko`;
            }, mimeType, quality);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});