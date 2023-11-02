import { createTournament } from "./tournament-maker.js";

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
    create_tournament: (url) => /^\/tournaments\/create$/.test(url),
    tournament: (url) => /^\/tournaments\/[\w-]{10}$/.test(url)
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
    $("#create-tournament").on("click", createTournament);
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
        renderHome();
    });
}
/**
 * Handles routing by checking the current URL path and loading the proper elements
 */


function routeUrl(){
    const path = document.location.pathname;
    if (url_routes.login(path)) {
        renderLogin();
        // Perform actions for the login route.
    } else {
        replaceUrl("/home");
        renderHome();
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        $("#display-user").text(user.displayName);
    }else{
        replaceUrl("/login");
        routeUrl();
    }
});

addEventListener("DOMContentLoaded", () => {
    routeUrl();
});

addEventListener("popstate", () => {
    if(!firebase.auth().currentUser){
        replaceUrl("/login");
        routeUrl();
    }
});