const root = document.createElement('div');
const h1 = document.createElement('h1');
    const container = document.createElement('div');
        const weather_input = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');
            const result = document.createElement('div');
        const weather_data = document.createElement('div');
            const current_weather = document.createElement('div');
                const details = document.createElement('div');
                    const h2 = document.createElement('h2');
                        const city_location = document.createElement('span');
                        const tirer = document.createElement('span');
                        const actual_date = document.createElement('span');
                    const h3TempMax = document.createElement('h3');
                        const city_temperature_max = document.createElement('span');
                        const city_temperature_max_degres = document.createElement('span');
                    const h3TempMin = document.createElement('h3');
                        const city_temperature_min = document.createElement('span');
                        const city_temperature_min_degres = document.createElement('span');
                    const Rain_probability = document.createElement('h3');
                        const city_Rain_probability = document.createElement('span');
                        const city_Rain_probability_percent = document.createElement('span');
                    const h3SunTime = document.createElement('h3');
                        const city_SunTime = document.createElement('span');
                        const city_SunTime_hours = document.createElement('span');
                const icon = document.createElement('div');
                    const img = document.createElement('img');
                    const weather_info_text = document.createElement('h4');
    const footer = document.createElement('footer');
        const pmonGithub = document.createElement('p');
        const a = document.createElement('a');


//Attributes root
root.id = 'root';
container.className = 'container';
weather_input.className = 'weather-input';
label.setAttribute('name', 'zip-search');
label.textContent = 'Enter a City Name';

h1.textContent = 'Weather Dashboard';
//Attributes input
input.setAttribute('id', 'zip-code-input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Entrer un code postal');
input.setAttribute('aria-label', 'zip-search');
input.setAttribute('maxlength', '5');

//Attributes result
result.setAttribute('id', 'result');


weather_data.className = 'weather-data';
current_weather.className = 'current-weather';

//Attributes details
city_location.setAttribute('id', 'city-location');
actual_date.setAttribute('id', 'actual-date');

city_location.textContent = '__';
tirer.textContent = ' - ';
//Attributes h3TempMax
h3TempMax.textContent = 'Temperature max: ';
city_temperature_max.setAttribute('id', 'city-temperature-max');
city_temperature_max.textContent = '__';
city_temperature_max_degres.textContent = '°C';

//Attributes h3TempMin
h3TempMin.textContent = 'Temperature min: ';
city_temperature_min.setAttribute('id', 'city-temperature-min');
city_temperature_min.textContent = '__';
city_temperature_min_degres.textContent = '°C';

details.className = 'details';

//Attributes Rain_probability   
Rain_probability.textContent = 'Rain probability: ';
city_Rain_probability.setAttribute('id', 'city-Rain_probability');
city_Rain_probability.textContent = '__';
city_Rain_probability.id = 'city-rain-probability';
city_Rain_probability_percent.textContent = '%';

h3SunTime.textContent = 'Sun time: ';
city_SunTime.setAttribute('id', 'city-sun-time');
city_SunTime.textContent = '__';
city_SunTime_hours.textContent = ' hours';


icon.className = 'icon';
img.setAttribute('alt', 'weather-icon');
img.src = 'https://openweathermap.org/img/wn/10d@4x.png';
weather_info_text.textContent = '_______________';
weather_info_text.id = 'weather-info-text';

pmonGithub.textContent = 'Crée par ';
a.setAttribute('href', 'https://github.com/Zalgow667/TD1_LEPLEY_LEBLAY_HAMON_EPPELE_IW/tree/v1');
a.textContent = 'Squid Game';
a.setAttribute('target', '_blank');
a.id = 'mon_github';


// AppendChild
document.body.appendChild(root)
    root.appendChild(h1);
    root.appendChild(container);
        container.appendChild(weather_input);
            weather_input.appendChild(label);
            weather_input.appendChild(input);
            weather_input.appendChild(result);
        container.appendChild(weather_data);
            weather_data.appendChild(current_weather);
                current_weather.appendChild(details);
                    details.appendChild(h2);
                        h2.appendChild(city_location);
                        h2.appendChild(tirer); 
                        h2.appendChild(actual_date);
                    details.appendChild(h3TempMax);
                        h3TempMax.appendChild(city_temperature_max);
                        h3TempMax.appendChild(city_temperature_max_degres);
                    details.appendChild(h3TempMin);
                        h3TempMin.appendChild(city_temperature_min);
                        h3TempMin.appendChild(city_temperature_min_degres);
                    details.appendChild(Rain_probability);
                        Rain_probability.appendChild(city_Rain_probability);
                        Rain_probability.appendChild(city_Rain_probability_percent);
                    details.appendChild(h3SunTime);
                        h3SunTime.appendChild(city_SunTime);
                        h3SunTime.appendChild(city_SunTime_hours);
                current_weather.appendChild(icon);
                    icon.appendChild(img);
                    icon.appendChild(weather_info_text);
    root.appendChild(footer);
        footer.appendChild(pmonGithub);
            pmonGithub.appendChild(a);