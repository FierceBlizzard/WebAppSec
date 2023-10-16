import { clearPageView, renderLogin, renderHome } from "./routing-util.js";


//log in 
export let getLogin = () =>{
  let google_provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(google_provider);
};

firebase.auth().onAuthStateChanged((user) => {
  if(!user){
    clearPageView;
    renderLogin();
  }else{
    renderHome();
  }
});