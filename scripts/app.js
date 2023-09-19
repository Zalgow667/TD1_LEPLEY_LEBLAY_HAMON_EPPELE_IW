const selectCity = document.getElementById('city-select')
const SearchWeatherReport = document.getElementById('search-weather-report');

SearchWeatherReport.style.visibility = "hidden";
selectCity.style.visibility = "hidden";

document.getElementById('codePost').addEventListener('input', () => {
    const codePost = document.getElementById('codePost').value;
    searchCity(codePost);
    selectCity.length = 0;
    selectCity.style.visibility = "hidden";
    SearchWeatherReport.style.visibility = "hidden";
    document.getElementById('tmax').textContent = "";
    document.getElementById('tmin').textContent = "";
    document.getElementById('probarain').textContent = "";
    document.getElementById('suntoday').textContent = "";
});

SearchWeatherReport.addEventListener('click', () => {
    searchWeatherReport();
});

function searchCity(codePostale) {
    if(/^\d{5}$/.test(codePostale)){
        fetch('https://geo.api.gouv.fr/communes?codePostal=' + codePostale)
            .then(response => response.json())

            .then(data => {
                if(data){
                    data.forEach(city => {
                        const option = document.createElement('option');
                        option.value = `${city.code}`
                        option.textContent = `${city.nom}`
                        selectCity.appendChild(option);
                        selectCity.style.visibility = "visible";
                        SearchWeatherReport.style.visibility = "visible";
                    });
                }
            })
            .catch(err => {
                console.error('Erreur lors de la requête' + err);
        })    
    } else {
        console.error('Veuillez indiquer un code postale avec un format valide !')
    }
}

function searchWeatherReport(){
    const inseeCode = selectCity.value;

    fetch('https://api.meteo-concept.com/api/forecast/daily/0?token=03a1b58ee7ed8629a6c05e0cc9cd2ed3e70a682b5e7167a577c6cd3de1b70e9b&insee=' + inseeCode)
        .then(response => response.json())

        .then(data => {
            document.getElementById('tmax').textContent = `${data.forecast.tmax}°C`;
            document.getElementById('tmin').textContent = `${data.forecast.tmin}°C`;
            document.getElementById('probarain').textContent = `${data.forecast.probarain}%`;
            document.getElementById('suntoday').textContent = `${data.forecast.sun_hours}h`;
        })
}