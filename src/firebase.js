// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// A configuração do Firebase copiada do Console Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDh9BbEg_-fyv7g60lFbVqFJKTFAydrajk",
    authDomain: "john-deere-app.firebaseapp.com",
    databaseURL: "https://john-deere-app-default-rtdb.firebaseio.com",
    projectId: "john-deere-app",
    storageBucket: "john-deere-app.appspot.com",
    messagingSenderId: "157740956226",
    appId: "1:157740956226:web:62092598083edb0423cbdb",
    measurementId: "G-1TRTPPZ9E6"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Inicializar serviços do Firebase, como Firestore e Auth
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
