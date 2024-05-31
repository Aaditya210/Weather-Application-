const API_KEY = '0845ea0d36c14cdc83e84233242505';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherData(`?key=${API_KEY}&q=${latitude},${longitude}`, true); 
}

function fetchWeatherByInput() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(`?key=${API_KEY}&q=${location}`, false); 
    } else {
        alert("Please enter a location");
    }
}

function fetchWeatherData(query, isCurrentLocation) {
    fetch(`${API_URL}${query}`)
        .then(response => response.json())
        .then(data => displayWeather(data, isCurrentLocation))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data, isCurrentLocation) {
    if (data) {
        const weatherInfo = document.getElementById('weather-info');
        const locationMessage = document.getElementById('location-message');
        weatherInfo.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Weather:</strong> ${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        `;
        locationMessage.textContent = isCurrentLocation ? 'Showing weather for your current location' : '';
    } else {
        alert('Location not found');
    }
}

function showError(error) {
    alert(`Geolocation error: ${error.message}`);
}
