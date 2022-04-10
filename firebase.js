// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhXLn6g2yuywzmPSGheL8xLArl0CS_1nM",
  authDomain: "kryptoapp-aa387.firebaseapp.com",
  projectId: "kryptoapp-aa387",
  storageBucket: "kryptoapp-aa387.appspot.com",
  messagingSenderId: "526793926573",
  appId: "1:526793926573:web:d7129779914325444b2324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);