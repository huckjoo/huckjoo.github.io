"use strict";

const clockText = document.querySelector(".clock__text");

function setClock(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    clockText.innerHTML = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds<10 ? `0${seconds}`:seconds}`
}

setInterval(setClock,500);