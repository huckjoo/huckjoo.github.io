"use strict";
const img = document.createElement("img");
img.setAttribute("class","background__img");
img.setAttribute("src",`imgs/star1.jpg`);

document.body.appendChild(img);

function onChangeBackground(){
    img.setAttribute("src",`imgs/star${Math.floor(Math.random()*4)+1}.jpg`);
}

const changeBackground = document.querySelector(".change__background");
changeBackground.addEventListener("click",onChangeBackground)