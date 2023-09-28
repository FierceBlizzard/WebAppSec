import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgxShC0CFMog7mDRn7U7zp9YyPFJjm9LA",
    authDomain: "tournment-b5ea5.firebaseapp.com",
    projectId: "tournment-b5ea5",
    storageBucket: "tournment-b5ea5.appspot.com",
    messagingSenderId: "453497938659",
    appId: "1:453497938659:web:a7748efa816f23fffadbd6",
    measurementId: "G-74C74RDH06"
  };

firebase.initializeApp(firebaseConfig);

function createPlayer(){
  let player = {
    user_name: "",
    first_name: "", 
    last_name: ""
  }; 

  player.user_name = $('#user_name').val();
  player.first_name = $('#first_name').val();
  player.last_name = $('#last_name').val();
  //creating new entries
  firebase.database().ref("/players").push(player);
}


