// SELECT ELEMENTS
const form = document.querySelector("#addForm");
const playerList = document.querySelector("#items");
const filterPlayer = document.querySelector("#filter");

// DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", getPlayers);

// FORM SUBMIT EVENT
form.addEventListener("submit", addPlayer);

// DELETE EVENT
playerList.addEventListener("click", deletePlayer);

// FILTER EVENT
filterPlayer.addEventListener("keyup", searchPlayer);

// GET PLAYERS FROM LOCAL STORAGE
function getPlayers() {
  let players;
  if (localStorage.getItem("players") === null) {
    players = [];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }

  players.forEach(function(player) {
    // CREATE NEW ELEMENT LI
    let li = document.createElement("li");
    // ADD CLASS
    li.className = "list-group-item";
    // ADD TEXT NODE WITH INPUT VALUE
    li.appendChild(document.createTextNode(player));

    // CREATE DELETE BUTTON
    let deleteButton = document.createElement("button");

    // ADD CLASSES TO DELETE BUTTON
    deleteButton.className = "btn btn-danger btn-sm float-right delete";

    // APPEND TEXT NODE
    deleteButton.appendChild(document.createTextNode("X"));

    // APPEND DELETE BUTTON TO LI
    li.appendChild(deleteButton);

    // APPEND LI TO LIST
    playerList.appendChild(li);
  });
}

function addPlayer(e) {
  e.preventDefault();

  // GET INPUT VALUE;
  let newPlayer = document.querySelector("#item").value;

  // CREATE NEW ELEMENT LI
  let li = document.createElement("li");

  // ADD CLASS
  li.className = "list-group-item";

  // ADD TEXT NODE WITH INPUT VALUE
  li.appendChild(document.createTextNode(newPlayer));

  // CREATE DELETE BUTTON
  let deleteButton = document.createElement("button");

  // ADD CLASSES TO DELETE BUTTON
  deleteButton.className = "btn btn-danger btn-sm float-right delete";

  // APPEND TEXT NODE
  deleteButton.appendChild(document.createTextNode("X"));

  // APPEND DELETE BUTTON TO LI
  li.appendChild(deleteButton);

  // APPEND LI TO LIST
  playerList.appendChild(li);

  // PERSIST DATA IN LOCAL STORAGE
  playerLocalStorage(newPlayer);
}

// STORE PLAYER
function playerLocalStorage(player) {
  let players;
  if (localStorage.getItem("players") === null) {
    players = [];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }
  players.push(player);

  localStorage.setItem("players", JSON.stringify(players));
}

// DELETE PLAYERS
function deletePlayer(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to remove it?")) {
      let li = e.target.parentElement;
      playerList.removeChild(li);
      // REMOVE FROM LOCAL STORAGE
      removePlayerFromLocalStorage(li);
    }
  }
}

// REMOVE PLAYERS FROM LOCAL STORAGE

function removePlayerFromLocalStorage(playerItem) {
  let players;
  if (localStorage.getItem("players") === null) {
    players = [];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }
  players.forEach((player, index) => {
    if (playerItem.textContent === player) {
      player.splice(index, 1);
    }
  });
  localStorage.setItem("players", JSON.stringify(players));
}

// SEARCH PLAYER
function searchPlayer(e) {
  // Convert text value to lower case
  let text = e.target.value.toLowerCase();
  // Get lis
  let players = playerList.querySelectorAll("li");
  let arrPlayers = Array.from(players);
  arrPlayers.map(player => {
    let playerName = player.firstChild.textContent;
    if (playerName.toLowerCase().indexOf(text) !== -1) {
      player.style.display = "block";
    } else {
      player.style.display = "none";
    }
  });
}
