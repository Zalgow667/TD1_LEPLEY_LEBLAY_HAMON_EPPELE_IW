document.getElementById('zip-code-input').addEventListener('input', () => {
    const codePost = document.getElementById('zip-code-input').value;
    
    if(codePost.length === 5){
        searchCity();
    }

    if(codePost.length < 5 && document.querySelector('ul')){
       document.querySelector('ul').remove();
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
                let resultDiv = document.getElementById("result");

                resultDiv.innerHTML = "";

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
                        
                            fetch('https://api.meteo-concept.com/api/forecast/daily/0?token=03a1b58ee7ed8629a6c05e0cc9cd2ed3e70a682b5e7167a577c6cd3de1b70e9b&insee=' + inseeCode)
                                .then(response => response.json())

                                .then(data => {
                                    document.getElementById('city-location').textContent = `${data.city.name}`;
                                    document.getElementById('city-temperature-max').textContent = `${data.forecast.tmax}`;
                                    document.getElementById('city-temperature-min').textContent = `${data.forecast.tmin}`;
                                    document.getElementById('city-rain-probability').textContent = `${data.forecast.probarain}`;
                                    document.getElementById('city-sun-time').textContent = `${data.forecast.sun_hours}`;
                                    document.getElementById('weather-info-text').textContent = ``
                                    resultDiv.style.visibility = "hidden";
                                });
                        };
                        ul.appendChild(li);
                    });
                    resultDiv.appendChild(ul);
                    resultDiv.style.visibility = "visible";
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

