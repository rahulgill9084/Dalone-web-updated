importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
    apiKey: "AIzaSyBpkShbd0mnofCLYIxQCT-eJhKuijB5oMc",
    authDomain: "eclassifyclone.firebaseapp.com",
    projectId: "eclassifyclone",
    storageBucket: "eclassifyclone.firebasestorage.app",
    messagingSenderId: "450270842348",
    appId: "1:450270842348:web:233e1a07aca77f0b1704c9",
    measurementId: "G-886ML2X8XZ"
  };

firebase?.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
    console.log('Hello world from the Service Worker :call_me_hand:');
});
