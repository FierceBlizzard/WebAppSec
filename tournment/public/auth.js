// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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

//This is all for login form
var visibility = function(show_sign_up){
  if(show_sign_up){
    $('#sign-up-form').css('visibility', 'visible');
  }else{
    $('#sign-up-form').css('visibility', 'hidden');
  }
  console.log("Testing");
};
var createAccount = function(){
  let email = $('#email-field').val();
  let password = $('#password-field').val();
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log("User created:", user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  console.log(email);
  console.log(password);
  visibility(false);
};
$('#new-user').on('click', visibility(true));

//This section of code is for creating new users
$('#sign-up-form').on('click',createAccount);