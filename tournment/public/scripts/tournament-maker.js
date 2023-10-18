import { replaceUrl, routeUrl, pushUrl, clearPageView } from "./routing-util.js";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";
import { renderTournament } from "./tournamentView.js";

const firebaseConfig = {
    apiKey: "AIzaSyAgxShC0CFMog7mDRn7U7zp9YyPFJjm9LA",
    authDomain: "tournment-b5ea5.firebaseapp.com",
    databaseURL: "https://tournment-b5ea5-default-rtdb.firebaseio.com",
    projectId: "tournment-b5ea5",
    storageBucket: "tournment-b5ea5.appspot.com",
    messagingSenderId: "453497938659",
    appId: "1:453497938659:web:07123d26dbb7c823fadbd6",
    measurementId: "G-VRVKVYJBPX"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export class Tournmanet {
    constructor(name, start_date, end_date){
        this.id = nanoid(10);
        this.creator_uid = firebase.auth().currentUser.uid;
        this.creator_display_name = firebase.auth().currentUser.displayName;
        this.date_created = new Date().toJSON();
        this.date_updated = new Date().toJSON();
        this.name = name;
        this.start_date = start_date.toJSON();
        this.end_date = end_date.toJSON();
        this.players = [];
    }
}

export class Player{
    constructor(name){
        this.name = name;
        this.scores = [];
    }
}
/**
 *  Save a tournament to the datebase
 */
let postTournament = function (tournament){
    tournament.date_updated = new Date().toJSON();
    firebase.database().ref(`/tournaments/${tournament.id}`).set(tournament);
}

/**
 * Setting up the tournament maker form
 */
export let createTournament = function(){
    clearPageView();
    pushUrl("/create_tournament");
    const form = document.createElement("form");
    form.id = "create-tournament";
    form.innerHTML = 
    `
    <form id="create-tournament">
    <input type="text" name="tournament-name" id="tournament-name" class="create-form-field" placeholder="tournament-name">
    <br>
    <label>start date
    <input type="datetime-local" name="start-date" id="start-date">
    </label>
    <br>
    <label>end date
    <input type="datetime-local" name="end-date" id="end-date">
    </label>
    <input type="submit" value="submit" id="submit">
    </form>`;

    $("#magic-header").textContent = "Create a Tournament";
    $("#magic").appendChild(form);
    
    var submitTournament = function(submitEvent){
        submitEvent.preventDefault();
        let name = $("#tournament-name").val();
        let start_date = new Date($("#start-date").val());
        let end_date =  new Date($("#end-date").val());
        let tournament = new Tournmanet(name, start_date, end_date);
        postTournament(tournament);
        replaceUrl(`/tournaments/${tournament.id}`);
        routeUrl();
    }
    let start_date = new Date($("#start-date").val());
    let end_date =  new Date($("#end-date").val());
    let current_date = new Date();
    if(start_date >= current_date && end_date > current_date && start_date < end_date){
        $("#submit").addEventListener("submit", submitTournament);
    }else{
        alert("Your start and end dates are invalid. Please try again");
    }
}

export let getTournament = function (id){
    return firebase.database().ref(`/tournaments/${id}`).get();
}

export let getTournamentList = function () {
    return firebase.database().ref("/tournaments").get();
}

export let removeTournament = function (id) {
    firebase.database().ref(`/tournaments/${id}`);
}

export let cardMaker = function(id){
    let card = document.createElement("div");

    card.innerHTML = `
    <div id=div${id} class="card">
        <div id=${id} class="container">
            <h3>${id}</h3>
        </div>
    </div>`;

    $("#magic").appendChild(card);
    $(`#div${id}`).on("click", () => {
        clearPageView();
        renderTournament(id);
    });
}

export let renderTournamentList = function (){
    getTournamentList().then(result => {
        let tournament_list = [];
        if(result.val()){
            tournament_list = Object.values(result.val());
        }
        for(let i = 0; i < tournament_list.length; i++){
            cardMaker(tournament_list[i]);
        }
    });

}

export let addPlayer = function(name, id){
    let newPlayer = new Player(name);
    let tournament = getTournament(id);
    tournament.players.append(newPlayer);
    postTournament(tournament);
}

export let removePlayer = function(name, id){
    let tournament = getTournament(id);
    tournament.players.filter(player => player.name != name);
    postTournament(tournament);
}

export let updatePlayerScore = function(name, id, score){
    let tournament = getTournament(id);
    let updated_players = tournament.players.filter(player => player.name != name);
    let updated_player = Player(name, score);
    updated_players.append(updated_player);
    tournament.players = updated_players;
    postTournament(tournament);
}