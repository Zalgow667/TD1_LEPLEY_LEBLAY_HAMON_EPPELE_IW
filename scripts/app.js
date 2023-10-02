import weatherMapping from './weather-code-map.js';
import createWeatherCard from './create-weather-card.js';

document.getElementById('zip-code-input').addEventListener('input', () => {
    const codePost = document.getElementById('zip-code-input').value;
    
    if(codePost.length === 5){
        searchCity();
    }

    if(codePost.length && document.getElementById('resultList')){
        document.getElementById('resultList').remove();
    }
});

document.getElementById('zip-code-input').addEventListener('click', () => {
    document.getElementById('result').style.visibility = 'visible';
});

function searchCity() {
    let codePostalInput = document.getElementById('zip-code-input');
    let codePostal = codePostalInput.value;

    if (/^\d{5}$/.test(codePostal)) {
        fetch('https://geo.api.gouv.fr/communes?codePostal=' + codePostal)
            .then(response => response.json())
            .then(data => {
                let resultDiv = document.getElementById('result');

                resultDiv.innerHTML = '';

                if (data.length > 0) {

                    let ul = document.createElement('ul');
                    ul.classList.add('resultList');

                    data.forEach(city => {
                        const li = document.createElement('li');
                        li.textContent = `${city.nom}`;
                        li.classList.add('resultCity');
                        li.setAttribute('id', `${city.code}`)

                        li.onclick = function(event){
                            const inseeCode = event.target.id;
                        
                            fetch('https://api.meteo-concept.com/api/forecast/daily/0?token=ecee532ddce7b5e3f19b9a1b25826f40092a21be0a86bc6bc25725374bb1fef2&insee=' + inseeCode)
                                .then(response => response.json())

                                .then(data => {
                                    document.getElementById('city-location').textContent = `${data.city.name}`;
                                    document.getElementById('city-temperature-max').textContent = `${data.forecast.tmax}`;
                                    document.getElementById('city-temperature-min').textContent = `${data.forecast.tmin}`;
                                    document.getElementById('city-rain-probability').textContent = `${data.forecast.probarain}`;
                                    document.getElementById('city-sun-time').textContent = `${data.forecast.sun_hours}`;
                                    resultDiv.style.visibility = 'hidden';
                                    
                                    let weatherCode = `${data.forecast.weather}`
                                    document.getElementById('weather-info-text').textContent = weatherMapping[weatherCode];
                                    weatherImage.imageSelection(weatherCode);
                                });
                        };
                        ul.appendChild(li);
                    });
                    resultDiv.appendChild(ul);
                    resultDiv.style.visibility = 'visible';
                } else {
                    resultDiv.textContent = 'Aucune ville trouvée pour ce code postal.';
                }
            })
            .catch(err => {
                console.error('Erreur lors de la requête : ' + err);
            })
    } else {
        console.error('Veuillez indiquer un code postal avec un format valide !')
    }
}

let today = new Date();
let months = today.getMonth() + 1;

if(months < 10){
    months = '0' + months;
}

document.getElementById('actual-date').textContent = ' (' + today.getDate() + '/' + months + '/' + today.getFullYear() + ')';

/* WEATHER CREATE CARD */

document.getElementById('number-of-weather-card').addEventListener('input', () =>  {
    let numberOfCard = document.getElementById('number-of-weather-card').value;

    if(numberOfCard === null){
        document.getElementById('number-day-display').textContent = 0;
    }

    if(numberOfCard > 7){
        document.getElementById('number-of-weather-card').value = '';
        alert('You must use a number under 7 to display weather-card');
    } else {
        createWeatherCard(numberOfCard);
    }
});