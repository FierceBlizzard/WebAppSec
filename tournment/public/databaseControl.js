import { initializeApp } from "./gstatic.com_firebasejs_9.9.4_firebase-app.js";
import firebase from 'firebase/app';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const dataRef = database.ref('/players')

var addPlayer = function(){
  let player = {
    user_name: "",
    first_name: "", 
    last_name: ""
  }; 

  player.user_name = $('#user_name').val();
  player.first_name = $('#first_name').val();
  player.last_name = $('#last_name').val();
  //creating new entries
  dataRef.push(player)
  .then(() => {
    console.log('Data added successfully!');
  })
  .catch((error) => {
    console.error('Error adding data: ', error);
  });
};

$('#add').on('click', addPlayer);
