function createWeatherCard(numberOfCard){
    document.getElementById('number-day-display').textContent = numberOfCard;

    let ul = document.getElementById('weather-cards');

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    let currentDate = new Date();

    for(let i = 0; i < numberOfCard; i++){  
        let li = document.createElement('li');
        li.classList.add('card');
        li.setAttribute('id', "day-" + (i+1));

        let h3 = document.createElement('h3');

        currentDate.setDate(currentDate.getDate() + 1);

        let h4_temp = document.createElement('h4')
        h4_temp.textContent = 'Temp: __C';

        let h4_wind = document.createElement('h4')
        h4_wind.textContent = 'Wind: __ M/S';

        let h4_humidity = document.createElement('h4')
        h4_humidity.textContent = 'Humidity: __%';

        let span = document.createElement('span');
        span.setAttribute('id', 'date');

        let day = currentDate.getDate();
        
        if(day < 10){
            day = "0" + day;
        }

        let month = currentDate.getMonth() + 1;
        
        if(month < 10){
            month = "0" + month;
        }

        let year = currentDate.getFullYear();
        span.textContent = '(' + day + '/' + month + '/' + year + ')';

        li.appendChild(h3);
        h3.appendChild(span);
        li.appendChild(h4_temp);
        li.appendChild(h4_wind);
        li.appendChild(h4_humidity);
        ul.appendChild(li);
    }
}

export default createWeatherCard;
