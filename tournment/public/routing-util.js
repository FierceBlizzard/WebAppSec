import { createTournament, renderTournamentList, renderTournament } from "./tournament-maker.js";

/**
 * Clears the page
 */
let clearPageView = () => $("#magic").innerHTML = "";
/**
 * Change the URL to the path and adds to history so you can go back
 */
let pushUrl = (path) => history.pushState(path, "", path);

/**
 * Changes the url to the given path but not added to browser history
 */
let replaceUrl = (path) => history.replaceState(path, "", path);

const url_routes = {
    login: (url) => /^\/login$/.test(url),
    create_tournament: (url) => /^\/tournament-create$/.test(url),
    tournament: (url) => /^\/tournaments\/[\w-]+$/.test(url)
};

function renderHome() {
    clearPageView();
    $("#magic").html( `
    <h1>Home</h1>
    <Button id="sign-out">Sign Out</Button>
    <Button id="create-tournament">Create Tournament</Button>
    `);
    $("#sign-out").on("click", ()=>{
        firebase.auth().signOut().then(
            (result) =>{
                $("#display-user").text("Not Logged In");
                replaceUrl("/login");
            },
            (error) => {
                console.log(error);
            }
        );
    });
    $("#create-tournament").on("click", ()=>{
        pushUrl("/create-tournament");
    });
    renderTournamentList();
    $(document).on("click", ".box", function(){
        const tournamentId = $(this).attr("id");
        pushUrl(`/tournaments/${tournamentId}`);
    });
}

//log in 
function renderLogin(){
    clearPageView();
    var provider = new firebase.auth.GoogleAuthProvider();
    $("#magic").html(`
    <h1>Login</h1>
    <Button id="login">Login</Button>
    `);
    $("#login").on("click", ()=>{
        firebase.auth().signInWithRedirect(provider);
        replaceUrl("/home");
    });
}
/**
 * Handles routing by checking the current URL path and loading the proper elements
 */


function routeUrl() {
    const path = document.location.pathname;
    if (url_routes.login(path)) {
        renderLogin();
        console.log("Login url");
        // Perform actions for the login route.
    } else if (url_routes.create_tournament(path)) {
        createTournament();
        console.log("create tournament url");
    } else if (url_routes.tournament(path)) {
        // No need to extract the tournament ID here
        const tournamentId = path.split('/').pop();
        console.log("made it to tournament path: ");
        console.log(tournamentId);
        renderTournament(tournamentId);
    } else {
        console.log("home url");
        renderHome();
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        $("#display-user").text(user.displayName);
        console.log(user.displayName);
    }else{
        replaceUrl("/login");
        routeUrl();
        console.log("Not Logged In")
    }
});

addEventListener("DOMContentLoaded", ()=>{
    routeUrl();
    console.log("The link has changed");
});

addEventListener("popstate", () => {
    if(!firebase.auth().currentUser) replaceUrl("/login");
    routeUrl();    
});