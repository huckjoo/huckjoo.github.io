"use strict";
const nameForm = document.querySelector(".name__form");
const nameInput = document.querySelector(".name__input");
const nameGreeting = document.querySelector(".name__greeting");
const nameChangeBtn = document.querySelector(".name__change");
const nameAskBox = document.querySelector(".name__ask");
function onSubmit(event){
    event.preventDefault();
    const value = nameInput.value;
    if (value===""){
        return
    }
    localStorage.setItem("name",nameInput.value);
    paintGreeting(value);
}

function onChangeName(){
    localStorage.removeItem("name");
    nameAskBox.classList.remove("hidden");
    nameGreeting.classList.add("hidden");
    nameChangeBtn.classList.add("hidden");
}

function paintGreeting(value){
    nameGreeting.textContent =`반가워 ${value}!`;
    nameAskBox.classList.add("hidden");
    nameGreeting.classList.remove("hidden");
    nameChangeBtn.classList.remove("hidden");
    nameChangeBtn.addEventListener("click",onChangeName);
}

const userName = localStorage.getItem("name")
if (userName === null){
    nameAskBox.classList.remove("hidden");
    nameForm.addEventListener("submit",onSubmit);
} else{
    paintGreeting(userName);
}