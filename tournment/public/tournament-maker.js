import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

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
    constructor(name, start_date, end_date, bracketData){
        this.id = nanoid(10);
        this.creator_uid = firebase.auth().currentUser.uid;
        this.creator_display_name = firebase.auth().currentUser.displayName;
        this.date_created = new Date().toJSON();
        this.date_updated = new Date().toJSON();
        this.name = name;
        this.start_date = start_date.toJSON();
        this.end_date = end_date.toJSON();
        this.bracketData = bracketData;
    }
}
function encodeResultsData (results) {
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
            for (let k = 0; k < results[i][j].length; k++) {
                results[i][j][k][0] = results[i][j][k][0] == null ? "" : results[i][j][k][0];
                results[i][j][k][1] = results[i][j][k][1] == null ? "" : results[i][j][k][1];
            }
        }
    }
    return results;
}

/**
 * Firebase can't store the null values that the bracket plugin needs. This function
 * converts the -1 values in firebase back to null values.
 * @param {*} results
 * @returns {*} The results data with empty strings replaced with -1 values.
 */
export function decodeResultsData (results) {
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
            for (let k = 0; k < results[i][j].length; k++) {
                results[i][j][k][0] = results[i][j][k][0] == "" ? null : results[i][j][k][0];
                results[i][j][k][1] = results[i][j][k][1] == "" ? null : results[i][j][k][1];
            }
        }
    }
    return results;
}
function encodeTeamData (teams) {
    for (let i = 0; i < teams.length; i++) {
        teams[i][0] = teams[i][0] == null ? "" : teams[i][0];
        teams[i][1] = teams[i][1] == null ? "" : teams[i][1];
    }
    return teams;
}

/**
 * Firebase can't store the null values that the bracket plugin needs. This function
 * converts the empty strings in firebase back to null values.
 * @param {string[][]} teams 
 * @returns {string[][]} The team data with emptry strings replaced with null values.
 */
export function decodeTeamData (teams) {
    for (let i = 0; i < teams.length; i++) {
        teams[i][0] = teams[i][0] == "" ? null : teams[i][0];
        teams[i][1] = teams[i][1] == "" ? null : teams[i][1];
    }
    return teams;
}
/**
 *  Save a tournament to the datebase
 */

function getTournament(id) {
    return firebase.database().ref(`/tournaments/${id}`).get();
}
function postTournament(tournament){
    tournament.date_updated = new Date();
    if(tournament.bracketData == null){
        tournament.bracketData = {
            teams: [[null, null]],
            results: [[[[null, null]]]]
        }
    }
    tournament.bracketData.teams = encodeTeamData(tournament.bracketData.teams);
    tournament.bracketData.results = encodeResultsData(tournament.bracketData.results);
    firebase.database().ref(`/tournaments/${tournament.id}`).set(tournament);
    firebase.database().ref(`/participant-lists/${tournament.id}/creator_uid`).set(tournament.creator_uid);
    firebase.database().ref(`/participant-lists/${tournament.id}/start_date`).set(Date.parse(new Date(tournament.start_date)));
}

function deleteTournament(id){
    firebase.database().ref(`/tournaments/${id}`).remove();
}
function postJoinRequest(id, user){
    firebase.database().ref(`/participant-lists/${id}/requests/${user.uid}`).set(user.displayName);
}
function getJoinRequests(id){
    return firebase.database().ref(`/participant-lists/${id}/requests`).get();
}
function acceptJoinRequests(tid, uid, displayName){
    firebase.database().ref(`/participant-lists/${tid}/requests/${uid}`).remove();
    firebase.database().ref(`/participant-lists/${tid}/accepts/${user.uid}`).set(displayName);
}
function getAcceptedList(tid){
    return firebase.database().ref(`/participant-lists/${tid}/accepts`);
}
function denyJoinRequest(tid, uid, displayName){
    firebase.database().ref(`/participant-lists/${tid}/requests/${uid}`).remove();
    firebase.database().ref(`/participant-lists/${tid}/denies/${user.uid}`).set(displayName);
}
function getDeniedRequests(tid){
    return firebase.database().ref(`/participant-lists/${tid}/denies`).get();
}
function createInfoDiv(tournament){
    $("#magic").html(
        `        
        <h2>${tournament.name}</h2>
        <h5>${tournament.id}</h5>
        <h3>Created by ${tournament.creator_display_name}</h3>
        `
    );
}
// all the rendering functions
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
            const bracket_data = {
                teams: [[null, null]],
                results: [[[[null, null]]]]
            }
            const newTourn = new Tournament(tournamentName, start_date, end_date, bracket_data);
            postTournament(newTourn);
            replaceUrl("/home");
            document.location.reload();
        } else {
          alert("Your start and end dates are invalid. Please try again");
        }
      });
}
function createJoinElement(tournament){
    const current_date = new Date();
    const start_date = tournament.start_date == null ? null : new Date(tournament.start_date);
    if(tournament.start_date && current_date < start_date){
        $("#magic").html(`
            <div id="join-id">
                <h1>Please join before ${tournament.start_date}</h1>
                <Button id="join-button">Join Tournament</Button>
            </div>
        `);
        $("#join-button").on("click", ()=>{
            postJoinRequest(tournament.id, firebase.auth().currentUser.uid);
        });
    }else{
        $("#magic").html(`
            <div id="join-id">I am sorry but the Tournament is closed. Best luck next time.</div>
        `);
    }
}
function createParticipantAcceptButton (tournament, id, name) {
    $("#magic").append(`
        <Button id="accept-button-${id}">Accept</Button>
    `);

    $(`#accept-button-${id}`).on("click", () => {

        let teams = tournament.bracketData.teams;
        let results = tournament.bracketData.results;
        let accepted_participant = false;

        for (let i = 0; i < teams.length; i++) {
            if (teams[i][0] == null) {
                teams[i][0] = name;
                accepted_participant = true;
                break;
            } else if (teams[i][1] == null) {
                teams[i][1] = name;
                accepted_participant = true;
                break;
            }
        }

        if (!accepted_participant) {
            teams.push([name, null]);
            results[0][0].push([null, null]);
            if (teams.length % 2 == 1) { 
                teams.push([null, null]);
                results[0][0].push([null, null]);
            }
        }

        postTournament(tournament);
        acceptJoinRequests(tournament.id, id, name);
    });
}
function createParticipantDenyButton (tournament, id, name) {
    $("#magic").append(`
        <Button id="deny-button-${id}">Deny</Button>
    `);

    $(`#deny-button-${id}`).on("click", () => {
        denyJoinRequest(tournament.id, id, name);
    });
}
function createParticipant (tournament, id, name) {
    $("#magic").append(`
        <li id={participant-${id}}>${id}</li>
        ${createParticipantAcceptButton(tournament, id, name)}
        ${createParticipantDenyButton(tournament, id, name)}
    `);
}
function createPotentialParticipantList (tournament, participants) {
    const participant_list = document.createElement("ul");
    participant_list.id = "participant-list";
    participant_list.textContent = "These participants have requested to join your bracket:";
    

    for (let i = 0; i < participants.length; i++) {
        const id = participants[i][0];
        const name = participants[i][1];

        const participant = createParticipant(tournament, id, name);
        participant_list.append(participant);
    }
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
            Object.keys(tournaments).forEach((tID) => {
                const tournament = tournaments[tID];
                $("#magic").append(`<div id=${tournament.id} class="box">${tournament.name}</div>`); });
        } else {
            console.log("No tournaments found.");
        }
        }).catch((error) => {
            console.error("Error getting tournaments:", error);
    });
}
export function renderTournament(tID) {
    getTournament(tID).then(result => {
        const tournament = result.val();
        tournament.bracketData.teams = decodeTeamData(tournament.bracketData.teams);
        tournament.bracketData.results = decodeResultsData(tournament.bracketData.results);
        
        createJoinElement(tournament);
        if(firebase.auth().currentUser.uid == tournament.creator_uid){
            getJoinRequests(tournament.id).then((result) => {
                const participants = result.val();
                const participant_values = []
                if (participants) {
                    for (const [key, value] of Object.entries(participants)) {
                        participant_values.push([key, value]);
                    }
                }
                createPotentialParticipantList(tournament, participant_values)
            });
        }
        const bracketContainer = $('<div id="tournament-bracket"></div>'); // Use the same ID as in the bracket initialization

        // Append the bracket container to the page
        $('#magic').append(bracketContainer);
        
        // Initialize the bracket with the tournament data
        $(function(){
            $('#tournament-bracket').bracket({
                init: tournament.bracketData,
                save: (data) => {
                    // Update the bracket data
                    tournament.bracketData = data;
                    // Post the updated tournament data to Firebase
                    postTournament(tournament);
                }
            });
        });
    });
}
