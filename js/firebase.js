//const firebase = require("firebase");
// Required for side-effects

var app_firebase = {};
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyA93SCeUCyt1NK11w0xtcRJLWpDGXrIP2g",
    authDomain: "library-42d1f.firebaseapp.com",
    databaseURL:
      "https://library-42d1f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "library-42d1f",
    storageBucket: "library-42d1f.appspot.com",
    messagingSenderId: "511354132374",
    appId: "1:511354132374:web:d103dbc98811646460efb7",
    measurementId: "G-GMFHKDE4DY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  app_firebase = firebase;
  var db = app_firebase.firestore();
})();
