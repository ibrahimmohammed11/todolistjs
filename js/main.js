let clear = document.querySelector(".clear");
let date = document.getElementById("date");
let list = document.getElementById("list");
let input = document.getElementById("input");
let plus = document.getElementById("plus");
let TasksCount = document.getElementById("TasksCount");
let noMessage = document.querySelector(".no-message");
let toDoList;

if (localStorage.getItem("toDo") === null) {
  toDoList = [];
} else {
  toDoList = JSON.parse(localStorage.getItem("toDo"));
  displayData();
}
clear.onclick = function () {
  localStorage.clear();
};

// Focus On Input Field
window.onload = function () {
  input.focus();
  taskCount();
};

// get Date time

function getDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = new Date();
  date.innerHTML = `${days[today.getDay()]}, ${
    months[today.getMonth()]
  } ${today.getDate()}`;
}
getDate();

// adding the task

plus.onclick = function () {
  if (input.value === "") {
    Swal.fire({
      icon: "error",
      title: "Please Enter your Task",
      text: "Oops...",
    });
  } else {
    if (plus.innerHTML.trim() == "Add") {
      toDoList.push(input.value);
    } else {
      updateTask();
    }
    noMessage.remove();
    displayData();
    localStorage.setItem("toDo", JSON.stringify(toDoList));
    resetForm();
    taskCount();
  }
};
// <i class="fa fa-circle-thin co" job="complete" id=${i} onclick="getTaskData(${i})"></i>
function displayData() {
  let data = "";
  for (let i = 0; i < toDoList.length; i++) {
    data += `<li class="item">
    <i class="fas fa-edit co" job="complete" id=${i} onclick="getTaskData(${i})"></i>
    <p class="text">${toDoList[i]}</p>
    <i class="far fa-trash-alt de" job="delete" id=${i} onclick="deleteOneItem(${i})"></i>
    </li>`;
  }
  list.innerHTML = data;
}
// reset Form

function resetForm() {
  input.value = "";
}

// Delete One Item
function deleteOneItem(index) {
  toDoList.splice(index, 1);
  localStorage.setItem("toDo", JSON.stringify(toDoList));
  displayData();
  taskCount();
}

// function finishTask(index) {
//   // toDoList[index].className += "finished";
//   console.log(toDoList[index]);
// }

function taskCount() {
  TasksCount.innerHTML = toDoList.length;
}

if (toDoList.length == 0) {
  noMessage.innerHTML = "No Tasks To Show";
} else {
  noMessage.remove();
}
// search by task

search.onkeyup = function (e) {
  let val = e.target.value;
  let data = "";
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].toLowerCase().includes(val.toLowerCase())) {
      data += `<li class="item">
      <i class="fas fa-edit co" job="complete" id=${i} onclick="getTaskData(${i})"></i>
      <p class="text">${toDoList[i]}</p>
      <i class="far fa-trash-alt de" job="delete" id=${i} onclick="deleteOneItem(${i})"></i>
      </li>`;
    }
  }
  list.innerHTML = data;
};

/* ----------------------------update-------------------------- */
function getTaskData(i) {
  input.value = toDoList[i];
  plus.innerHTML = "Update";
  currentIndex = i;
}
function updateTask() {
  toDoList.splice(currentIndex, 1, input.value);
  localStorage.setItem("toDo", JSON.stringify(toDoList));
  plus.innerHTML = "Add";
}

/* ----------------------------update-------------------------- */
