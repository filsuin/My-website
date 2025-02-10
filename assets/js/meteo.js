const API_KEY = CONFIG.WEATHER_API_KEY; // Remplacer par votre clé API OpenWeatherMap

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

let timeoutId;

document.getElementById('city-input').addEventListener('input', function(e) {
    clearTimeout(timeoutId);
    const input = e.target.value;
    
    if (input.length < 2) {
        document.getElementById('suggestions').style.display = 'none';
        return;
    }

    timeoutId = setTimeout(() => {
        fetchSuggestions(input);
    }, 200);
});

function fetchSuggestions(input) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const uniqueCities = filterUniqueCities(data);
            displaySuggestions(uniqueCities);
        })
        .catch(error => console.error('Error:', error));
}

function filterUniqueCities(cities) {
    const seen = new Set();
    return cities.filter(city => {
        const cityKey = `${city.name.toLowerCase()}-${city.country}`;
        if (!seen.has(cityKey)) {
            seen.add(cityKey);
            return true;
        }
        return false;
    }).slice(0, 5);
}

function displaySuggestions(cities) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    
    if (cities.length > 0) {
        cities.forEach(city => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            const state = city.state ? `, ${city.state}` : '';
            div.textContent = `${city.name}${state}, ${city.country}`;
            div.addEventListener('click', () => {
                document.getElementById('city-input').value = div.textContent;
                suggestionsContainer.style.display = 'none';
                getWeatherData(city.name);
            });
            suggestionsContainer.appendChild(div);
        });
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

// Fermer les suggestions si on clique ailleurs
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-input-container')) {
        document.getElementById('suggestions').style.display = 'none';
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