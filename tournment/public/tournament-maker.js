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
let replaceUrl = (path) => history.replaceState(path, "", path);

export class Tournament {
    constructor(name, start_date, end_date){
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
function updateTournament(tournament){
    tournament.date_updated = new Date().toJSON();
    firebase.database().ref(`/tournaments/${tournament.id}`).set(tournament);
}

function getTournament(id){
    return firebase.database().ref(`/tournaments/${id}`).get();
}

export function getTournamentList() {
    return firebase.database().ref("tournaments").get();
}

function  removeTournament(id) {
    firebase.database().ref(`/tournaments/${id}`);
}

function addPlayer(name, id){
    let newPlayer = new Player(name);
    let tournament = getTournament(id);
    tournament.players.append(newPlayer);
    updateTournament(tournament);
}

export function removePlayer(name, id){
    let tournament = getTournament(id);
    tournament.players.filter(player => player.name != name);
    updateTournament(tournament);
}

function updatePlayerScore(name, id, score){
    let tournament = getTournament(id);
    let updated_players = tournament.players.filter(player => player.name != name);
    let updated_player = Player(name, score);
    updated_players.append(updated_player);
    tournament.players = updated_players;
    updateTournament(tournament);
}


export function createTournament(){
    $("#magic").html( 
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
    <input type="submit" name="submit" id="submit">
    </form>
    `);

    $("#magic-header").textContent = "Create a Tournament";
    
    $("#create-tournament").on("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
    
        let start_date = new Date($("#start-date").val());
        let end_date = new Date($("#end-date").val());
        let tournamentName = $("#tournament-name").val();
        let current_date = new Date();
    
        if (start_date > current_date && end_date > current_date && end_date > start_date) {
          const newTourn = new Tournament(tournamentName, start_date, end_date);
          firebase.database().ref(`tournaments`).push(newTourn);
          replaceUrl("/home");
          document.location.reload();
        } else {
          console.log(current_date);
          console.log(start_date);
          console.log(end_date);
          alert("Your start and end dates are invalid. Please try again");
        }
      });
}


export function renderTournamentList(){
    // Get a reference to the "tournaments" collection
    const tournamentsRef = firebase.database().ref("tournaments");

    // Fetch the data
    tournamentsRef.once("value").then((snapshot) => {
        // The snapshot contains the data from the "tournaments" collection
        const tournaments = snapshot.val();

        // Process and use the retrieved data
        if (tournaments) {
        // Loop through the tournaments and do something with each one
            Object.keys(tournaments).forEach((tournamentId) => {
                const tournament = tournaments[tournamentId];
                console.log(tournament);
                $("#magic").append(`<div id=${tournament.name} class="box">${tournament.name}</div>`); });
        } else {
            console.log("No tournaments found.");
        }
        }).catch((error) => {
            console.error("Error getting tournaments:", error);
    });
   
    /*tournaments.forEach(function(tournament){
        $("#magic").append(`
            <div id=${tournament.name} class="card">
                <div id=${tournament.name}2 class="container">
                    <h3>${tournament.name}</h3>
                </div>
            </div>
        `);
    });*/
}
