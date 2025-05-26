/**
 * Weather functionality for Horizons West Digital Signage
 * Fetches and displays real-time weather data for Perth
 */

// Perth coordinates
const PERTH_LAT = -31.9523;
const PERTH_LON = 115.8613;

// DOM elements
const currentTempElement = document.getElementById('current-temp');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.getElementById('weather-icon');

// Weather code mapping to icons and descriptions
const weatherCodes = {
    0: { icon: 'clear-day.svg', description: 'Clear sky' },
    1: { icon: 'partly-cloudy-day.svg', description: 'Mainly clear' },
    2: { icon: 'partly-cloudy-day.svg', description: 'Partly cloudy' },
    3: { icon: 'cloudy.svg', description: 'Overcast' },
    45: { icon: 'fog.svg', description: 'Fog' },
    48: { icon: 'fog.svg', description: 'Depositing rime fog' },
    51: { icon: 'drizzle.svg', description: 'Light drizzle' },
    53: { icon: 'drizzle.svg', description: 'Moderate drizzle' },
    55: { icon: 'drizzle.svg', description: 'Dense drizzle' },
    56: { icon: 'freezing-drizzle.svg', description: 'Light freezing drizzle' },
    57: { icon: 'freezing-drizzle.svg', description: 'Dense freezing drizzle' },
    61: { icon: 'rain.svg', description: 'Slight rain' },
    63: { icon: 'rain.svg', description: 'Moderate rain' },
    65: { icon: 'rain.svg', description: 'Heavy rain' },
    66: { icon: 'freezing-rain.svg', description: 'Light freezing rain' },
    67: { icon: 'freezing-rain.svg', description: 'Heavy freezing rain' },
    71: { icon: 'snow.svg', description: 'Slight snow fall' },
    73: { icon: 'snow.svg', description: 'Moderate snow fall' },
    75: { icon: 'snow.svg', description: 'Heavy snow fall' },
    77: { icon: 'snow-grains.svg', description: 'Snow grains' },
    80: { icon: 'rain-showers.svg', description: 'Slight rain showers' },
    81: { icon: 'rain-showers.svg', description: 'Moderate rain showers' },
    82: { icon: 'rain-showers.svg', description: 'Violent rain showers' },
    85: { icon: 'snow-showers.svg', description: 'Slight snow showers' },
    86: { icon: 'snow-showers.svg', description: 'Heavy snow showers' },
    95: { icon: 'thunderstorms.svg', description: 'Thunderstorm' },
    96: { icon: 'thunderstorms-with-hail.svg', description: 'Thunderstorm with slight hail' },
    99: { icon: 'thunderstorms-with-hail.svg', description: 'Thunderstorm with heavy hail' }
};

/**
 * Fetch weather data from Open-Meteo API
 */
async function fetchWeatherData() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${PERTH_LAT}&longitude=${PERTH_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Australia%2FPerth`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return null;
    }
}

/**
 * Update the weather display with fetched data
 */
function updateWeatherDisplay(data) {
    if (!data || !data.current) {
        console.error('Invalid weather data received');
        return;
    }
    
    const { temperature_2m, apparent_temperature, relative_humidity_2m, weather_code, wind_speed_10m } = data.current;
    
    // Update temperature displays
    currentTempElement.textContent = `${Math.round(temperature_2m)}°C`;
    feelsLikeElement.textContent = `${Math.round(apparent_temperature)}°C`;
    
    // Update humidity
    humidityElement.textContent = `${Math.round(relative_humidity_2m)}%`;
    
    // Update wind speed
    windSpeedElement.textContent = `${Math.round(wind_speed_10m)} km/h`;
    
    // Update weather icon
    const weatherInfo = weatherCodes[weather_code] || weatherCodes[0]; // Default to clear if code not found
    weatherIconElement.innerHTML = `<img src="assets/icons/${weatherInfo.icon}" alt="${weatherInfo.description}" title="${weatherInfo.description}">`;
}

/**
 * Initialize weather functionality
 */
async function initWeather() {
    // Fetch and display weather immediately
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        updateWeatherDisplay(weatherData);
    }
    
    // Then update every 15 minutes (900000 ms)
    setInterval(async () => {
        const refreshedData = await fetchWeatherData();
        if (refreshedData) {
            updateWeatherDisplay(refreshedData);
        }
    }, 900000);
}

// Start weather updates when the page loads
document.addEventListener('DOMContentLoaded', initWeather);
