document.getElementById('currencyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = (amount * rate).toFixed(2);
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
            document.getElementById('copyButton').style.display = 'block'; // Afficher le bouton copier
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('result').innerText = 'Erreur lors de la récupération des taux de change.';
            document.getElementById('copyButton').style.display = 'none'; // Cacher le bouton copier en cas d'erreur
        });
});

// Ajouter la fonctionnalité de copie
document.getElementById('copyButton').addEventListener('click', function() {
    const resultText = document.getElementById('result').textContent;
    navigator.clipboard.writeText(resultText).then(function() {
        // Feedback visuel
        this.style.color = '#4487d3';
        setTimeout(() => this.style.color = '#27279c', 200);
    }.bind(this));
});