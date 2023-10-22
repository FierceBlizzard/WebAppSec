/**
import { createTournament, renderTournamentList } from "./tournament-maker";
import { renderTournament } from "./tournamentView";
*/
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

/**
 * Clears the page
 */
export let clearPageView = () => $("#magic").innerHTML = "";
/**
 * Change the URL to the path and adds to history so you can go back
 */
export let pushUrl = (path) => history.pushState(path, "", path);

/**
 * Changes the url to the given path but not added to browser history
 */
export let replaceUrl = (path) => history.replaceState(path, "", path);

const url_routes = {
    login: (url) => /^\/login$/.test(url),
    create_tournament: (url) => /^\/tournaments\/create$/.test(url),
    tournament: (url) => /^\/tournaments\/[\w-]{10}$/.test(url)
};

let renderHome = function(){
    // Button to make a tournament
    //var user = "";
    clearPageView();
    $("#magic").html( `
    <h1>Home</h1>
    <Button id=sign-out>Sign Out</Button>
    `);
    $("#sign-out").on("click", ()=>{
        firebase.auth().signOut().then(
            (result) =>{
                replaceUrl("/login");
            },
            (error) => {
                console.log(error);
            }
        );;
    });
   // $("#magic").innerHTML = `<Button id="create-tournament">Create Tournament</Button>`;
    //$("#create-button").on("click", createTournament);
    //renderTournamentList();
}

//log in 
let renderLogin = function(){
    clearPageView();
    var provider = new firebase.auth.GoogleAuthProvider();
    $("#magic").html(`
    <h1>Login</h1>
    <Button id="login">Login</Button>
    `);
    $("#login").on("click", ()=>{
        firebase.auth().signInWithRedirect(provider);
        replaceUrl("/home");
        renderHome();
    });
}
/**
 * Handles routing by checking the current URL path and loading the proper elements
 */


function routeUrl() {
    const path = document.location.pathname;
    if (url_routes.login(path)) {
        renderLogin();
        // Perform actions for the login route.
    } else {
        replaceUrl("/home");
        renderHome();
    }
}


addEventListener("DOMContentLoaded", () => {
    routeUrl();
});

addEventListener("popstate", () => {
    routeUrl();
});