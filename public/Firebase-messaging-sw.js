/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
);

firebase.initializeApp({
    apiKey: "AIzaSyDKRo3jE_qh_r-4D6pjJI570bgvhk2XmOA",
    authDomain: "chat-web-app77.firebaseapp.com",
    databaseURL: "https://chat-web-app77-default-rtdb.firebaseio.com",
    projectId: "chat-web-app77",
    storageBucket: "chat-web-app77.appspot.com",
    messagingSenderId: "771846954988",
    appId: "1:771846954988:web:b5b06c290dd4cb9bf0eac9"
});

firebase.messaging();