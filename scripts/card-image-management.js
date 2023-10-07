// Define a function named changeIcone that takes a weatherCode as a parameter
let changeIcone = (weatherCode) => {
    // Get a reference to the HTML element with the ID 'weather-info-icon'
    const weatherIcon = document.getElementById('weather-info-icon');

    // Use a series of if-else statements to determine which weather icon to display based on the weatherCode

    // WeatherCode 0: Clear sky (sun icon)
    if (weatherCode == 0) {
        weatherIcon.src = './images/icones/icons8-sun-64.png';
    }
    // WeatherCode 1-2: Partly cloudy (clouds icon)
    else if (weatherCode >= 1 && weatherCode <= 2) {
        weatherIcon.src = './images/icones/icons8-clouds-64.png';
    }
    // WeatherCode 3-5: Cloudy (clouds icon)
    else if (weatherCode >= 3 && weatherCode <= 5) {
        weatherIcon.src = './images/icones/icons8-clouds-64.png';
    }
    // WeatherCode 6-7: Mist (mist icon)
    else if (weatherCode >= 6 && weatherCode <= 7) {
        weatherIcon.src = './images/icones/icons8-mist-64.png';
    }
    // WeatherCode 8-16 or 143: Rain (rain icon)
    else if (weatherCode >= 8 && weatherCode <= 16 || weatherCode >= 143) {
        weatherIcon.src = './images/icones/icons8-rain-64.png';
    }
    // WeatherCode 17-32: Snow (snow icon)
    else if (weatherCode >= 17 && weatherCode <= 32) {
        weatherIcon.src = './images/icones/icons8-snow-64.png';
    }
    // WeatherCode 33-78: High chance of rain (high rain icon)
    else if (weatherCode >= 33 && weatherCode <= 78) {
        weatherIcon.src = './images/icones/icons8-high-rain-64.png';
    }
    // WeatherCode 79-142: Thunderstorms (thunder icon)
    else if (weatherCode >= 79 && weatherCode <= 142) {
        weatherIcon.src = './images/icones/icons8-thunder-64.png';
    }
}

// Export the changeIcone function as the default export of this module
export default changeIcone;
