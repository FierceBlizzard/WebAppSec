import { clearPageView } from "./routing-util.js";

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

// Setting up the links for the database access
const database = firebase.database();
const dataRef = database.ref('/tournament');


/**
 * Setting up the tournament maker form
 */
const form = document.createElement("form");
form.id = "create-tournament";
form.innerHTML = 
`<p>Create New Tournament</p>
<form id="create-tournament">
<input type="text" name="creator-name" id="creator-name" class="create-form-field" placeholder="name">
<input type="text" name="tournament-name" id="tournament-name" class="create-form-field" placeholder="tournament-name">
<input type="email" name="creator-email" id="email-field" class="create-form-field" placeholder="email">
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

document.querySelector("#magic-header").textContent = "Create a Tournament";
document.querySelector("#magic").appendChild(form);

var createTournament = function(submitEvent){
    submitEvent.preventDefault();
    var tournament = {
        tournament_name : document.querySelector("#tournament-name").value,
        creator_name : document.querySelector("#creator-name").value,
        creator_email : document.querySelector("#email-field").value,
        start_date : document.querySelector("#start-date").value,
        end_date : document.querySelector("#end-date").value
    };
    dataRef.push(tournament);
    clearPageView();
}


document.querySelector("#magic").addEventListener("submit", createTournament);