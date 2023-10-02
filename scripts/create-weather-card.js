class WeatherCard {
    constructor(temperature, probarain, humidity) {
        this.temperature = temperature;
        this.probarain = probarain;
        this.humidity = humidity;
    }

    render() {
        const li = document.createElement('li');
        li.classList.add('card');

        const h3 = document.createElement('h3');

        const h4_temp = document.createElement('h4');
        h4_temp.textContent = `Temp: ${this.temperature}°C`;

        const h4_probarain = document.createElement('h4');
        h4_probarain.textContent = `Rain Probability: ${this.probarain}%`;

        const h4_humidity = document.createElement('h4');
        h4_humidity.textContent = `Humidity: ${this.humidity}%`;

        li.appendChild(h3); 
        li.appendChild(h4_temp);
        li.appendChild(h4_probarain);
        li.appendChild(h4_humidity);

        return li;
    }
}

async function createWeatherCard(numberOfCard) {
    document.getElementById('number-day-display').textContent = numberOfCard;

    const ul = document.getElementById('weather-cards');

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    const weatherData = []; 

    for (let i = 0; i < numberOfCard; i++) {
        const response = await fetch('https://api.meteo-concept.com/api/forecast/daily?token=ecee532ddce7b5e3f19b9a1b25826f40092a21be0a86bc6bc25725374bb1fef2&insee=');
        const data = await response.json();
        const forecast = data.forecast;
        const temperature = `${forecast[i+1].tmax}`;
        const probarain = `${forecast[i+1].probarain}`;
        const humidity = `${forecast[i+1].humidity}`;


        const weatherCard = new WeatherCard(temperature, probarain, humidity);
        weatherData.push(weatherCard);
    }

    weatherData.forEach(card => {
        ul.appendChild(card.render());
    });
}

export default createWeatherCard;
