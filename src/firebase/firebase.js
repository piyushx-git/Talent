// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxDmcCJJI9U02Ocb5rI4vOZugdpBNQChQ",
  authDomain: "talenthunt-2aad1.firebaseapp.com",
  projectId: "talenthunt-2aad1",
  storageBucket: "talenthunt-2aad1.firebasestorage.app",
  messagingSenderId: "744025395013",
  appId: "1:744025395013:web:4fe5d5b12e8fcd9ede782c",
  measurementId: "G-7D97YG9EHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export {app,analytics,auth};