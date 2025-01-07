document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('url');
    const formatSelect = document.getElementById('format');
    const qualitySelect = document.getElementById('quality');
    const downloadContainer = document.getElementById('downloadContainer');

    const url = urlInput.value;
    const format = formatSelect.value;
    const quality = qualitySelect.value;

    if (!url) {
        alert('Veuillez entrer un lien de vidéo YouTube.');
        return;
    }

    // Utilisation d'une API tierce pour télécharger la vidéo
    const apiUrl = `https://api.example.com/download?url=${encodeURIComponent(url)}&format=${format}&quality=${quality}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const downloadLink = document.createElement('a');
                downloadLink.href = data.downloadUrl;
                downloadLink.textContent = `Télécharger ${format.toUpperCase()} (${quality})`;
                downloadLink.className = 'button';
                downloadContainer.innerHTML = '';
                downloadContainer.appendChild(downloadLink);
            } else {
                alert('Erreur lors du téléchargement. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors du téléchargement. Veuillez réessayer.');
        });
});