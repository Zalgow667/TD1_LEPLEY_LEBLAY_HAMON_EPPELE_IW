class WeatherCard {
    constructor(date, temperature_max, temperature_min, probarain, suntime, latitude, longitude, rr10, wind10m, dirwind10m) {
        this.date = date;
        this.temperature_max = temperature_max;
        this.temperature_min = temperature_min;
        this.probarain = probarain;
        this.suntime = suntime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.rr10 = rr10;
        this.wind10m = wind10m;
        this.dirwind10m = dirwind10m;
    }

    render(options) {
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
        h4_suntime.textContent = `Sun: ${this.suntime} hours`;

        li.appendChild(h3); 
        li.appendChild(h4_temp_max);
        li.appendChild(h4_temp_min);
        li.appendChild(h4_probarain);
        li.appendChild(h4_suntime);

        if(options.showLatitude){
            const h4_latitude = document.createElement('h4');
            h4_latitude.textContent = `Latitude: ${this.latitude}`;
            li.appendChild(h4_latitude);
        }

        if (options.showLongitude) {
            const h4_longitude = document.createElement('h4');
            h4_longitude.textContent = `Longitude: ${this.longitude}`;
            li.appendChild(h4_longitude);
        }

        if (options.showRain) {
            const h4_rain = document.createElement('h4');
            h4_rain.textContent = `Rain Proba: ${this.rr10}%`;
            li.appendChild(h4_rain);
        }
        
        if (options.showWindSpeed) {
            const h4_wind_speed = document.createElement('h4');
            h4_wind_speed.textContent = `Wind Speed: ${this.wind10m} m/s`;
            li.appendChild(h4_wind_speed);
        }
        
        if (options.showWindDirection) {
            const h4_wind_direction = document.createElement('h4');
            h4_wind_direction.textContent = `Wind Direction: ${this.dirwind10m}`;
            li.appendChild(h4_wind_direction);
        }        

        return li;
    }
}

async function createWeatherCard(numberOfCard, inseeCode, options) {
    document.getElementById('number-day-display').textContent = numberOfCard;

    const ul = document.getElementById('weather-cards');

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    const weatherData = []; 
    const tokenAPI = '5c0cadf135fd6cfb956038574e1c512a5a1ceaaae332055011376af57c50bb49';

    for (let i = 0; i < numberOfCard; i++) {
        const response = await fetch('https://api.meteo-concept.com/api/forecast/daily?token=' + tokenAPI + '&insee=' + inseeCode);
        const data = await response.json();
        const forecast = data.forecast;

        let today = new Date();
        let months = today.getMonth() + 1;
        let day = (today.getDate()+(i+1));

        day = day < 10 ? '0' + day : day;
        months = months < 10 ? '0' + months : months;

        const date = day + '/' + months + '/' + today.getFullYear();

        const weatherCard = new WeatherCard(date, forecast[i+1].tmax, forecast[i+1].tmin, forecast[i+1].probarain, forecast[i+1].sun_hours, forecast[i+1].latitude, forecast[i+1].longitude, forecast[i+1].rr10, forecast[i+1].wind10m, forecast[i+1].dirwind10m);
        weatherData.push(weatherCard);
    }

    weatherData.forEach(card => {
        ul.appendChild(card.render(options));
    });
}

export default createWeatherCard;



