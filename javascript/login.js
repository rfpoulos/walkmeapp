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
    // sign in
    var firebaseUser = firebase.database().ref('users/00001');
    
    firebaseUser.on('value', function(snapshot) {
      if (snapshot.val()['email'] === email && snapshot.val()['password'] === pass) {
        console.log(true);
      }
  });
});