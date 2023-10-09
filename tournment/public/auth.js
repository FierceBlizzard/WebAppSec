// Rendering the sign up form
const form = document.createElement("form");
form.id = "sign-up";
form.innerHTML = `<form id="sign-up-form">
<p>Welcome New User</p>
<input type="text" name="email" id="email-field" class="login-form-field" placeholder="email">
<input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
<input type="submit" value="submit" id="sign-up-form-submit">
</form>`;
$('#magic').appendChild(form);

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
};

//This section of code is for creating new users
$('#sign-up-form').on('click',createAccount);

//log in 
let renderLgin = () =>{

};