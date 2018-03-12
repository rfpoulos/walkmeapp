// auth.onAuthStateChanged(firebaseUser => { });
var config = {
  apiKey: "AIzaSyChvgSJwWRcfCZ1m9onBBb3Zyf3dZ5bRYQ",
  authDomain: "walkme-app-1520459500880.firebaseapp.com",
  databaseURL: "https://walkme-app-1520459500880.firebaseio.com",
  projectId: "walkme-app-1520459500880",
  storageBucket: "",
  messagingSenderId: "829716536506"
};
firebase.initializeApp(config);
//GRABBING ELEMENTS FROM DOM
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogout = document.getElementById('btnLogout');

//ADD LOGIN EVENT

btnLogin.addEventListener('click', e => {
  // get email and password
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  // sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//ADD SIGNUP EVENT
btnSignUp.addEventListener('click', e=> {
  // get email and password
  // to do: add a check to ensure email is real
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  // sign up
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});
//realtime event listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
  } else {
    console.log('not logged in');
  }
});