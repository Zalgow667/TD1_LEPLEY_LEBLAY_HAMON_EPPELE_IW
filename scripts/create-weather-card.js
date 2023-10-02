function createWeatherCard(numberOfCard){
    let ul = document.getElementById('weather-cards');

    for(let i = 0; i < numberOfCard; i++){
        let li = document.createElement('li');
        li.classList.add('card');
        li.setAttribute('id', "day-" + (i+1));

        let h3 = document.createElement('h3');

        let h4_temp = document.createElement('h4')
        h4_temp.textContent = 'Temp: __C';

        let h4_wind = document.createElement('h4')
        h4_wind.textContent = 'Wind: __ M/S';

        let h4_humidity = document.createElement('h4')
        h4_humidity.textContent = 'Humidity: __%';

        let span = document.createElement('span');
        span.setAttribute('id', 'actual-date2');
        span.textContent = '(' + i + '/10/2023)'

        li.appendChild(h3);
        h3.appendChild(span);
        li.appendChild(h4_temp);
        li.appendChild(h4_wind);
        li.appendChild(h4_humidity);
        ul.appendChild(li);
    }
}

export default createWeatherCard;

