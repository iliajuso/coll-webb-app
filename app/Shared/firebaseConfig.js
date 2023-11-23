// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUvNh8W9b4BIFuECD6E2zcdsa7A17gXJ0",
  authDomain: "collections-app-39e76.firebaseapp.com",
  projectId: "collections-app-39e76",
  storageBucket: "collections-app-39e76.appspot.com",
  messagingSenderId: "204901401719",
  appId: "1:204901401719:web:0ae7c0deda03e8d7193272",
  measurementId: "G-QJG0J2PEVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

