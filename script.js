var time = document.getElementById("time");
var form = document.getElementById("form");
var medicineName = document.getElementById("name");
var remainderTime = document.getElementById("remainder");
var tableBody = document.getElementById("tbody");
var alertMessage = document.getElementById("alert");
var msg = document.getElementById("message");
var ok = document.getElementById("ok");
var audio;
let remainders = [];

function displayTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  time.innerHTML =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;
}
setInterval(displayTime, 1000);

form.addEventListener("submit", addRemainder);
function addRemainder(event) {
  event.preventDefault();
  let name = event.target[0].value;
  let time = event.target[1].value;
  let remainder = {
    name: name,
    time: time,
  };
  if (name !== "Select your Tablet" && time) {
    remainders.push(remainder);
    event.target[0].value = "";
    event.target[1].value = "";
  }
  displayRemainders();
}

function displayRemainders() {
  tableBody.innerHTML = "";
  remainders.forEach((remainder) => {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = remainder.name;
    var td2 = document.createElement("td");
    td2.innerHTML = remainder.time;
    var td3 = document.createElement("td");
    var del = document.createElement("button");
    del.setAttribute("class", "delete");
    del.innerHTML = "Delete";
    td3.appendChild(del);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  });
}

tableBody.addEventListener("click", deleteRemainder);

function deleteRemainder(event) {
  console.log("it's working")
  if (event.target.classList.contains("delete")) {
    var row = event.target.parentNode.parentNode;
    var index = row.rowIndex - 1;
    remainders.splice(index, 1);
    displayRemainders();
  }
}

function checkRemainders() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var time2 = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  var matchedRemainders = remainders.filter((value) => value.time === time2);
  matchedRemainders.forEach((val) => {
    msg.innerHTML = `Time to Take ${val.name}!`;
    alertMessage.style.display = "block";
    audio = new Audio("ring.wav");
    audio.loop = true;
    audio.play();
    console.log("Alert: Time to Take " + val.name);
  });
}

ok.addEventListener("click", () => {
  var reminderIndex = remainders.findIndex(
    (reminder) => reminder.time === alertMessage.getAttribute("data-time")
  );

  if (reminderIndex !== -1) {
    remainders.splice(reminderIndex, 1);
    displayRemainders();
  }
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  alertMessage.style.display = "none";
});

setInterval(checkRemainders, 60000);
