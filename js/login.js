/*var ui = new firebaseui.auth.AuthUI(firebase.auth());
let loginbtn = document.querySelector(".firebaseui-id-idp-button");
var provider = new firebase.auth.GoogleAuthProvider();
var user = null;
var credential = null;
loginbtn.addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
/* credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});
console.log(user);*/
(function () {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "main.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "Terms of Service",
    // Privacy policy url.
    privacyPolicyUrl: "Privacy Policy"
  };
  ui.start("#firebaseui-auth-container", uiConfig);
})();
