"use strict";

const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const todoLists = document.querySelector(".todo__ul");
const doneLists = document.querySelector(".done__ul");
let toDos = []//DB
let dones = []//DB
function onSubmit(event){
    event.preventDefault();
    const value = todoInput.value;
    const ID = Date.now();
    if(value === ""){
        return
    }
    const todo = {"value":value,"ID":ID}
    toDos.push(todo);
    todoInput.value="";
    localStorage.setItem("userList",JSON.stringify(toDos))
    paintTodo(todo);
}

function paintTodo(todo){
    const li = document.createElement("li");
    li.id = todo.ID;
    const span = document.createElement("span");
    span.textContent = todo.value
    span.setAttribute("class","todo__span")
    const checkBtn = document.createElement("button");
    checkBtn.setAttribute('class','todo__checkBtn');
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class","todo__deleteBtn");
    delBtn.innerHTML = `<i class="fas fa-times"></i>`;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    todoLists.appendChild(li);
    const todoCheckBtns = document.querySelectorAll(".todo__checkBtn");
    todoCheckBtns.forEach((x)=>x.addEventListener("click",doneList));
    todoCheckBtns.forEach((x)=>x.addEventListener("click",deleteList));
    const todoDelBtns = document.querySelectorAll(".todo__deleteBtn");
    todoDelBtns.forEach((x)=>x.addEventListener("click",deleteList));
}

function paintAll(){
    toDos = JSON.parse(userTodoList);
    JSON.parse(userTodoList).forEach((x)=>paintTodo(x))
    dones = JSON.parse(userDoneList);
    JSON.parse(userDoneList).forEach((x)=>paintDone(x))
}

function deleteList(){
    const curID = this.parentNode.id;
    for (let i=0; i<toDos.length;i++){
        if(toDos[i].ID===parseInt(curID)){
            toDos.splice(i,1);
            i--;
        }
    }
    const curUserTodoList = localStorage.getItem("userList");
    const curTodoList = JSON.parse(curUserTodoList);
    for (let i=0; i<curTodoList.length;i++){
        if(curTodoList[i].ID===parseInt(curID)){
            curTodoList.splice(i,1);
            i--;
        }
    }
    localStorage.setItem("userList",JSON.stringify(curTodoList));
    this.parentNode.remove();//화면상에서 지움
}

function doneList(){
    const text = this.parentNode.querySelector("span").textContent;
    const id = this.parentNode.id;
    const doneObj = {"value":text,"id":id}
    dones.push(doneObj)
    localStorage.setItem("doneList",JSON.stringify(dones))
    paintDone(doneObj);
}

function deleteDone(){
    const curID = this.parentNode.id;
    for (let i=0; i<dones.length;i++){
        if(dones[i].id===curID){
            dones.splice(i,1);
            i--;
        }
    }
    const curUserDoneList = localStorage.getItem("doneList");
    const curDoneList = JSON.parse(curUserDoneList);
    for (let i=0; i<curDoneList.length;i++){
        if(curDoneList[i].id===curID){
            curDoneList.splice(i,1);
            i--;
        }
    }
    localStorage.setItem("doneList",JSON.stringify(curDoneList));
    this.parentNode.remove();//화면상에서 지움
}

function paintDone(doneObj){
    const li = document.createElement("li");
    li.id = doneObj.id;
    const span = document.createElement("span");
    span.textContent = doneObj.value;
    span.setAttribute("class","done__span")
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class","done__deleteBtn");
    delBtn.innerHTML = `<i class="fas fa-times"></i>`;
    li.appendChild(span);
    li.appendChild(delBtn);
    doneLists.appendChild(li);
    const doneDelBtns = document.querySelectorAll(".done__deleteBtn");
    doneDelBtns.forEach((x)=>x.addEventListener("click",deleteDone));
}

todoForm.addEventListener("submit",onSubmit);

const userTodoList = localStorage.getItem("userList");
const userDoneList = localStorage.getItem("doneList");
if ((userTodoList === null || userTodoList==='[]')&&(userDoneList === null || userDoneList==='[]')){ //만약 불러올 todoList가 없다면, 

}else{//불러올 todoList가 있다면,
    paintAll();
    const todoDelBtns = document.querySelectorAll(".todo__deleteBtn");
    todoDelBtns.forEach((x)=>x.addEventListener("click",deleteList));
    const todoCheckBtns = document.querySelectorAll(".todo__checkBtn");
    todoCheckBtns.forEach((x)=>x.addEventListener("click",doneList));
    todoCheckBtns.forEach((x)=>x.addEventListener("click",deleteList));
    const doneDelBtns = document.querySelectorAll(".done__deleteBtn");
    doneDelBtns.forEach((x)=>x.addEventListener("click",deleteDone));
}