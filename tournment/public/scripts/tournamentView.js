import {addPlayer, removePlayer, removeTournament} from "./tournament-maker";
import { clearPageView } from "./routing-utils.js";
import { pushUrl } from "./routing-util";

let renderAddPlayers = function(){
    clearPageView();
    let addPlayerform = document.createElement("form");
    addPlayerform.id = "addPlayers";
    addPlayerform.innerHTML = 
    `
    <form id="addplayers">
    <input type="text" name="player-name" id="player-name" class="create-form-field" placeholder="player name">
    <br>
    <button id="Add">Add</button>
    <input type="submit" value="submit" id="submit">
    </form>
    `;
    $("#magic-header").textContent = "Adding Players";
    $("#magic").appendChild(addPlayerform);
    $("#Add").on("click", () => {
        let name = $("#player-name").val();
        addPlayerToList(name);
    });
}

let renderRemovePlayers = function() {
    clearPageView();
    let removePlayerform = document.createElement("form");
    removePlayerform.id = "removePlayers";
    removePlayerform.innerHTML = 
    `
    <form id="removePlayers">
    <input type="text" name="player-name" id="player-name" class="create-form-field" placeholder="player name">
    <br>
    <button id="Remove">Remove</button>
    <input type="submit" value="submit" id="submit">
    </form>
    `;
    $("#magic-header").textContent = "Removing Players";
    $("#magic").appendChild(removePlayerForm);
    $("#Remove").on("click", () => {
        let name = $("#player-name").val();
        removePlayerFromList(name);
    }); 
}

$("#addPlayer").on("click", renderAddPlayers);
$("#removePlayer").on("click", renderRemovePlayers);
$("#submit").on("click", () => {
    clearPageView();
    renderTournament();
});

let addPlayerToList = function(name){
    const path = document.location.pathname;
    const id = path.split("/")[2];
    addPlayer(name, id);
}
let removePlayerFromList = function(name){
    const path = document.location.pathname;
    const id = path.split("/")[2];
    removePlayer(name, id);
}

export let renderTournament = function(id){
    clearPageView();
    pushUrl(`/tournament/${id}`);
    let addPlayerButton = document.createElement("button");
    addPlayerButton.id = "addPlayer"
    addPlayerButton.innerHTML = `<button id="addPlayer">Add Players</button>`;

    let removePlayerButton = document.createElement("button");
    removePlayerButton.id = "removePlayer"
    removePlayerButton.innerHTML = `<button id="removePlayer">Remove Players</button>`;

    $("#magic-header").textContent = "Tournament View";
    $("#magic").appendChild(addPlayerButton);
    $("#magic").appendChild(removePlayerButton);
}