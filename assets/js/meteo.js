const API_KEY = 'YOUR_API_KEY'; // Remplacer par votre clé API OpenWeatherMap

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
    }
});

document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const city = this.value;
        if (city) {
            getWeatherData(city);
        }
    }
});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ville non trouvée');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            alert('Erreur : ' + error.message);
        });
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + 
                                   data.weather[0].description.slice(1);
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Conversion m/s en km/h

    weatherContainer.style.display = 'block';
}