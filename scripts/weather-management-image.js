changeIcone = (weatherCode) => {
if(weatherCode == 0){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-sun-64.png');
}else if(weatherCode >= 1 && weatherCode <= 2){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-clouds-64.png');
}else if(weatherCode >= 3 && weatherCode <= 5){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-clouds-64.png');
}else if(weatherCode >= 6 && weatherCode <= 7){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-mist-64.png');
}else if(weatherCode >= 8 && weatherCode <= 16 || weatherCode >= 143){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-rain-64.png');
}else if(weatherCode >= 17 && weatherCode <= 32){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-snow-64.png');
}else if(weatherCode >= 33 && weatherCode <= 78){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-high-rain-64.png');
}else if(weatherCode >= 79 && weatherCode <= 142){
    document.getElementById("weather-info-icon").attributes('src', './images/icones/icons8-thunder-64.png');
}
}
