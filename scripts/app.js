document.getElementById('codePost').addEventListener('input', () => {
    const codePost = document.getElementById('codePost').value;
    searchCity(codePost);

    if(codePost.length < 5 && document.querySelector('ul')){
       document.querySelector('ul').remove();
    }
});

function searchCity() {
    var codePostalInput = document.getElementById("codePost");
    var codePostal = codePostalInput.value;

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
                                    document.getElementById('tmax').textContent = `${data.forecast.tmax}°C`;
                                    document.getElementById('tmin').textContent = `${data.forecast.tmin}°C`;
                                    document.getElementById('probarain').textContent = `${data.forecast.probarain}%`;
                                    document.getElementById('suntoday').textContent = `${data.forecast.sun_hours}h`;
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


