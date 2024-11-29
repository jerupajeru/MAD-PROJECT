// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC80H_Ea5h2HgQVT212FngIGEB6qmd0dZY",
  authDomain: "petlogin-fc3cc.firebaseapp.com",
  projectId: "petlogin-fc3cc",
  storageBucket: "petlogin-fc3cc.appspot.com",
  messagingSenderId: "627825449201",
  appId: "1:627825449201:web:09ae340ea53db5b1f73150",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore correctly
