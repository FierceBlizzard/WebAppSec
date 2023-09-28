import { initializeApp } from "firebase/app";

let player = {
    username: String,
    firstname: String, 
    lastname: String
}

const firebaseConfig = {
  apiKey: "AIzaSyAgxShC0CFMog7mDRn7U7zp9YyPFJjm9LA",
  authDomain: "tournment-b5ea5.firebaseapp.com",
  projectId: "tournment-b5ea5",
  storageBucket: "tournment-b5ea5.appspot.com",
  messagingSenderId: "453497938659",
  appId: "1:453497938659:web:a7748efa816f23fffadbd6",
  measurementId: "G-74C74RDH06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);