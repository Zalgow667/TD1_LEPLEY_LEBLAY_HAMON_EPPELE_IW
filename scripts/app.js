document.getElementById('sendCodePost').addEventListener('click', () => {
    const codePost = document.getElementById('codePost').value;
    searchCity(codePost);
});

function searchCity(codePostale) {
    fetch('https://geo.api.gouv.fr/communes?codePostal=' + codePostale)
        .then(response => {
            console.log(response.json());
        })
        .then(data => {
            console.log(data);

            if(data && data.length === 1){
                const commune = data[0];
                document.getElementById('showCityName').textContent = commune;
            }
        })
        .catch(err => {
            console.error('Erreur lors de la requête' + err);
        })
}