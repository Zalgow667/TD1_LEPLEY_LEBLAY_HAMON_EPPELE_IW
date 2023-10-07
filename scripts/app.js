// Import necessary modules
import weatherMapping from './weather-code-map.js';
import createWeatherCard from './create-weather-card.js';
import changeIcone from './card-image-management.js';

// Get the current date
let today = new Date();
let months = today.getMonth() + 1;
let day = today.getDate();

// Get references to HTML elements
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const sendBtn = document.getElementById('sendBtn');
const modal = document.getElementById('modal');
const showLatitudeCheckbox = document.getElementById('showLatitude');
const showLongitudeCheckbox = document.getElementById('showLongitude');
const showRainCheckbox = document.getElementById('showRain');
const showWindSpeedCheckbox = document.getElementById('showWindSpeed');
const showWindDirectionCheckbox = document.getElementById('showWindDirection');
const sendSettingsButton = document.getElementById('sendBtn');

// Event listener for zip code input changes
document.getElementById('zip-code-input').addEventListener('input', () => {
    const codePost = document.getElementById('zip-code-input').value;

    if (codePost.length === 5) {
        searchCity();
    }

    if (codePost.length && document.getElementById('resultList')) {
        document.getElementById('resultList').remove();
    }
});

// Event listener for zip code input click
document.getElementById('zip-code-input').addEventListener('click', () => {
    document.getElementById('result').style.visibility = 'visible';
});

// Function to search for cities based on zip code
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

                        // Event handler for clicking on a city
                        li.onclick = function (event) {
                            const inseeCode = event.target.id;
                            document.getElementById('insee-code').textContent = " " + inseeCode + " -";
                            const tokenAPI = '5c0cadf135fd6cfb956038574e1c512a5a1ceaaae332055011376af57c50bb49'

                            fetch('https://api.meteo-concept.com/api/forecast/daily/0?token=' + tokenAPI + '&insee=' + inseeCode)
                                .then(response => response.json())
                                .then(data => {
                                    document.getElementById('city-location').textContent = `${data.city.name} -`;
                                    document.getElementById('city-temperature-max').textContent = `${data.forecast.tmax}`;
                                    document.getElementById('city-temperature-min').textContent = `${data.forecast.tmin}`;
                                    document.getElementById('city-rain-probability').textContent = `${data.forecast.probarain}`;
                                    document.getElementById('city-sun-time').textContent = `${data.forecast.sun_hours}`;
                                    resultDiv.style.visibility = 'hidden';
                                    openBtn.style.display = 'block';

                                    let weatherCode = `${data.forecast.weather}`
                                    changeIcone(weatherCode);
                                    document.getElementById('weather-info-text').textContent = weatherMapping[weatherCode];
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

// Format day and month with leading zeros
day = day < 10 ? '0' + day : day;
months = months < 10 ? '0' + months : months;

// Display the current date
document.getElementById('actual-date').textContent = ' (' + day + '/' + months + '/' + today.getFullYear() + ')';

/* MODAL MANAGE */

// Event listener for opening the modal
openBtn.addEventListener('click', () => {
    modal.showModal();
});

// Event listener for closing the modal
closeBtn.addEventListener('click', () => {
    modal.close();
});

// Event listener for sending data and closing the modal
sendBtn.addEventListener('click', () => {
    modal.close();
});

/* WEATHER CREATE CARD */

// Event listener for changing the number of weather cards
document.getElementById('number-of-weather-card').addEventListener('input', () => {
    let numberOfCard = document.getElementById('number-of-weather-card').value;
    document.getElementById('value-input-range').textContent = numberOfCard;
});

// Event listener for sending weather card settings
sendSettingsButton.addEventListener('click', function () {
    const showLatitude = showLatitudeCheckbox.checked;
    const showLongitude = showLongitudeCheckbox.checked;
    const showRain = showRainCheckbox.checked;
    const showWindSpeed = showWindSpeedCheckbox.checked;
    const showWindDirection = showWindDirectionCheckbox.checked;
    let numberOfCard = document.getElementById('number-of-weather-card').value;
    let inseeCode = document.getElementById('insee-code').textContent;

    // Call function to create weather cards with selected settings
    createWeatherCard(numberOfCard, inseeCode, { showLatitude, showLongitude, showRain, showWindSpeed, showWindDirection });
});
