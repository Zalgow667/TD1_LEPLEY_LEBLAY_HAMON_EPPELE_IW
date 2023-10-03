class WeatherCard {
    constructor(date, temperature_max, temperature_min, probarain, suntime) {
        this.date = date;
        this.temperature_max = temperature_max;
        this.temperature_min = temperature_min;
        this.probarain = probarain;
        this.suntime = suntime;
    }

    render() {
        const li = document.createElement('li');
        li.classList.add('card');

        const h3 = document.createElement('h3');
        h3.classList.add('date-for-card');
        h3.textContent = `(${this.date})`

        const h4_temp_max = document.createElement('h4');
        h4_temp_max.textContent = `Temp-max: ${this.temperature_max}°C`;

        const h4_temp_min = document.createElement('h4');
        h4_temp_min.textContent = `Temp-min: ${this.temperature_min}°C`;

        const h4_probarain = document.createElement('h4');
        h4_probarain.textContent = `Rain Proba: ${this.probarain}%`;

        const h4_suntime = document.createElement('h4');
        h4_suntime.textContent = `Suntime: ${this.suntime} hours`;

        li.appendChild(h3); 
        li.appendChild(h4_temp_max);
        li.appendChild(h4_temp_min);
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
        const temperature_max = `${forecast[i+1].tmax}`;
        const temperature_min = `${forecast[i+1].tmin}`;
        const probarain = `${forecast[i+1].probarain}`;
        const suntime = `${forecast[i+1].sun_hours}`;

        let today = new Date();
        let months = today.getMonth() + 1;
        let day = (today.getDate()+(i+1));

        day = day < 10 ? '0' + day : day;
        months = months < 10 ? '0' + months : months;

        const date = day + '/' + months + '/' + today.getFullYear();

        const weatherCard = new WeatherCard(date, temperature_max, temperature_min, probarain, suntime);
        weatherData.push(weatherCard);
    }

    weatherData.forEach(card => {
        ul.appendChild(card.render());
    });
}

export default createWeatherCard;
