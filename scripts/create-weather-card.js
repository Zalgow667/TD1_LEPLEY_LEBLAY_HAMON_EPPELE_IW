class WeatherCard {
    constructor(temperature, probarain, suntime) {
        this.temperature = temperature;
        this.probarain = probarain;
        this.suntime = suntime;
    }

    render() {
        const li = document.createElement('li');
        li.classList.add('card');

        const h3 = document.createElement('h3');

        const h4_temp = document.createElement('h4');
        h4_temp.textContent = `Temp: ${this.temperature}°C`;

        const h4_probarain = document.createElement('h4');
        h4_probarain.textContent = `Rain Probability: ${this.probarain}%`;

        const h4_suntime = document.createElement('h4');
        h4_suntime.textContent = `Suntime: ${this.suntime} hrs`;

        li.appendChild(h3); 
        li.appendChild(h4_temp);
        li.appendChild(h4_probarain);
        li.appendChild(h4_suntime);

        return li;
    }
}

async function createWeatherCard(numberOfCard, inseeCode) {
    document.getElementById('number-day-display').textContent = numberOfCard;

    const ul = document.getElementById('weather-cards');

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    const weatherData = []; 
    const tokenAPI = 'e003b70d11dfefb5064e06e213571d587f54dfb6701c1287f87a604678b0e14e';

    for (let i = 0; i < numberOfCard; i++) {
        const response = await fetch('https://api.meteo-concept.com/api/forecast/daily?token=' + tokenAPI + '&insee=' + inseeCode);
        const data = await response.json();
        const forecast = data.forecast;
        const temperature = `${forecast[i+1].tmax}`;
        const probarain = `${forecast[i+1].probarain}`;
        const suntime = `${forecast[i+1].sun_hours}`;


        const weatherCard = new WeatherCard(temperature, probarain, suntime);
        weatherData.push(weatherCard);
    }

    weatherData.forEach(card => {
        ul.appendChild(card.render());
    });
}

export default createWeatherCard;
