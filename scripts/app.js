const selectCity = document.getElementById('city-select');
const bouttonSend = document.getElementById('sendCodePost');

document.getElementById('sendCodePost').addEventListener('click', () => {
    const codePost = document.getElementById('codePost').value;
    searchCity(codePost);
});

function searchCity(codePostale) {
    fetch('https://geo.api.gouv.fr/communes?codePostal=' + codePostale)
        .then(response => response.json())

        .then(data => {
            if(data){
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = `${city.code}`
                    option.textContent = `${city.nom}`
                    selectCity.appendChild(option);
                });
            }
        })
        .catch(err => {
            console.error('Erreur lors de la requête' + err);
    })    
}