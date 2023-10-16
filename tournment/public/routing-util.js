import { getLogin } from "./auth";
import { createTournament, renderTournamentList } from "./tournament-maker";
import { renderTournament } from "./tournamentView";

export let clearPageView = () => $("#magic").innerHTML = "";

const url_routes = {
    login: (url) => /^\/login$/.test(url),
    create_tournament: (url) => /^\/tournaments\/create$/.test(url),
    tournament_list: (url) => /^\/tournaments$/.test(url),
    tournament: (url) => /^\/tournaments\/[\w-]{10}$/.test(url)
};

async function renderHome(){
    // Button to make a tournament
    const button = document.createElement("Button");
    button.id = "create-tournament";
    button.innerHTML = `<Button id="create-tournament">Create Tournament</Button>`;
    $("#magic").appendChild(button);
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

/**
 * Change the URL to the path and adds to history so you can go back
 */
export let pushUrl = (path) => history.pushState(path, "", path);

/**
 * Changes the url to the given path but not added to browser history
 */
export let replaceUrl = (path) => history.replaceState(path, "", path);

/**
 * Handles routing by checking the current URL path and loading the proper elements
 */
export function routeUrl(){
    const path = document.location.pathname;
    clearPageView();

    if(url_routes.login(path)){
        renderLogin();
    } else if (url_routes.create_tournament(path)){
        createTournament();
    } else if (url_routes.tournament(path)){
        const id = path.split("/")[2];
        renderTournament(id);
    } else if (url_routes.tournament_list(path)){
        renderTournamentList();
    } else {
        replaceUrl("/home");
        renderHome();
    }
}

addEventListener("DOMContentLoaded", routeUrl);
addEventListener("popstate", ()=> {
    if(!firebase.auth.currentUser) replaceUrl("/login");
    routeUrl();
});