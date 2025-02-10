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
        .then(weatherData => {
            displayWeatherData(weatherData);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        })
        .then(response => response.json())
        .then(forecastData => {
            document.getElementById('weather-container').style.display = 'block';
            displayHourlyForecast(forecastData);
            displayDailyForecast(forecastData);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

function displayWeatherData(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = Math.round(data.wind.speed * 3.6);
}

function displayHourlyForecast(data) {
    const container = document.getElementById('hourly-forecast');
    container.innerHTML = '';
    
    data.list.slice(0, 8).forEach(item => {
        const date = new Date(item.dt * 1000);
        container.innerHTML += `
            <div class="forecast-card">
                <div class="forecast-date">${date.getHours()}h</div>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather">
                <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            </div>
        `;
    });
}

function displayDailyForecast(data) {
    const container = document.getElementById('daily-forecast');
    container.innerHTML = '';
    
    const dailyData = [];
    const days = new Set();
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!days.has(date)) {
            days.add(date);
            dailyData.push(item);
        }
    });

    dailyData.slice(0, 7).forEach(item => {
        const date = new Date(item.dt * 1000);
        container.innerHTML += `
            <div class="forecast-card">
                <div class="forecast-date">${date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</div>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather">
                <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            </div>
        `;
    });
}

// Gestion des boutons de toggle
document.getElementById('hourly-btn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('daily-btn').classList.remove('active');
    document.getElementById('hourly-forecast').style.display = 'flex';
    document.getElementById('daily-forecast').style.display = 'none';
});

document.getElementById('daily-btn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('hourly-btn').classList.remove('active');
    document.getElementById('hourly-forecast').style.display = 'none';
    document.getElementById('daily-forecast').style.display = 'flex';
});