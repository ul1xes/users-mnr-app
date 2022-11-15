import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mnr-users-http.firebaseapp.com",
  databaseURL: "https://mnr-users-http-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mnr-users-http",
  storageBucket: "mnr-users-http.appspot.com",
  messagingSenderId: "1092371995257",
  appId: "1:1092371995257:web:52ce3f353efe4b04a652a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();