"use strict";
function onGeoGood(position){
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const API_KEY = 'b6e44deac7ae97e625d9b458362c5fe1'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then((data)=>paintWheather(data))
}
function onGeoBad(){
    console.log(new Error("i can't find you"))
}
function paintWheather(data){
    const wheaterInfo = document.querySelector(".wheater__info");
    wheaterInfo.textContent = `πμμΉ:${data.name},λ μ¨:${data.weather[0].main}`
}
navigator.geolocation.getCurrentPosition(onGeoGood,onGeoBad);