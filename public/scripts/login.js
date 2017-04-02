'use strict'

function ACMS() {

    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');
    this.userName = document.getElementById('user-name');
    this.userPic = document.getElementById('user-pic');
    this.singInSnackbar = document.getElementById('must-signin-snackbar');

    this.signInButton.addEventListener('click', this.signIn.bind(this));
    this.signOutButton.addEventListener('click', this.signOut.bind(this));

    this.initFirebase();


}

ACMS.prototype.initFirebase = function () {
    // shortcuts to Firebase SDK features
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // initiates firebase auth and listen to auth state changes
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

ACMS.prototype.signIn = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        // console.log('token ' + token);
        // console.log('user ' + user);

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

    });
};

ACMS.prototype.signOut = function () {
    this.auth.signOut().then(function () {
    }).catch(function (error) {
       // An error happened
    });
};

// Triggers when the auth state change for instance when the user signs-in or signs-out
ACMS.prototype.onAuthStateChanged = function (user) {
    if (user) {
        var profilePicUrl = user.photoURL;
        var userName = user.displayName;

        // set the user's profile pic and name
        this.userPic.style.bakgroundImage = 'url(' + profilePicUrl + ')';
        this.userName.textContent = userName;

        // Show user's profile and sign-out button
        this.userName.removeAttribute('hidden');
        this.userPic.removeAttribute('hidden');
        this.signOutButton.removeAttribute('hidden');

        // Hide sign-in button
        this.signInButton.setAttribute('hidden', 'true');
    } else {
        // hide user's profile and sign-out button
        this.userName.setAttribute('hidden', 'true');
        this.userPic.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');

        // show sign-in button
        this.signInButton.removeAttribute('hidden');
    }
};

window.onload = function () {
    window.acms = new ACMS();
};

