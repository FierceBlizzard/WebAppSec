/**
 * import { getLogin } from "./auth";
import { createTournament, renderTournamentList } from "./tournament-maker";
import { renderTournament } from "./tournamentView";
*/
//export let clearPageView = () => $("#magic").innerHTML = "";

/** 
const url_routes = {
    login: (url) => /^\/login$/.test(url),
    create_tournament: (url) => /^\/tournaments\/create$/.test(url),
    tournament_list: (url) => /^\/tournaments$/.test(url),
    tournament: (url) => /^\/tournaments\/[\w-]{10}$/.test(url)
};

async function renderHome(){
    // Button to make a tournament
    $("#magic").innerHTML = `<Button id="create-tournament">Create Tournament</Button>`;
    $("#magic-header").textContent = "Home";
    $("#create-button").on("click", createTournament);
    renderTournamentList();
}

$("#create-button").on("click", createTournament);

export function renderLogin(){
    const button = document.createElement("Button");
    button.innerHTML = `<Button id="login-button">login</Button>`;
    $("#magic").appendChild(button);
    $("#magic-header").textContent = "Login";
    $("#login-button").on("click", () => {
        getLogin.then(
            () => {
                clearPageView();
                replaceUrl("/home");
                renderHome();
            }
        );
    });
}
*/
/**
 * Change the URL to the path and adds to history so you can go back
 */
//export let pushUrl = (path) => history.pushState(path, "", path);

/**
 * Changes the url to the given path but not added to browser history
 */
//export let replaceUrl = (path) => history.replaceState(path, "", path);

/**
 * Handles routing by checking the current URL path and loading the proper elements
 */


function routeUrl() {
    const url = document.location.pathname;

    console.log(url);

    if (url.includes("/login")) {
        console.log("Login works");
        // Perform actions for the login route.
    } else if (url.includes("/create_tournament")) {
        console.log("create tournament works");
        // Perform actions for the create tournament route.
    } else if (url.includes("/tournament")) {
        console.log("tournament works");
        //const id = url.split("/")[2];
        //renderTournament(id);
    } else {
        console.log("home works");
        // Perform actions for the home route.
    }
}

addEventListener("DOMContentLoaded", () => {
    console.log("content loader works before");
    routeUrl();
    console.log("content loader works after");
});

addEventListener("popstate", () => {
    console.log("popstate works");
    routeUrl();
});