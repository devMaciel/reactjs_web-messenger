import React from 'react';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzeg4WvTm5HJZnRLLHnHh6HJjKn8vNff8",
    authDomain: "zapzap-ef3ee.firebaseapp.com",
    databaseURL: "https://zapzap-ef3ee.firebaseio.com",
    projectId: "zapzap-ef3ee",
    storageBucket: "zapzap-ef3ee.appspot.com",
    messagingSenderId: "339099452278",
    appId: "1:339099452278:web:fe77443341d23db82ab057"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;