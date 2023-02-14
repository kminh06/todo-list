// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVY5nrYgO1QgMImuO59UroX034T3kAhvo",
  authDomain: "todo-list-bcf38.firebaseapp.com",
  projectId: "todo-list-bcf38",
  storageBucket: "todo-list-bcf38.appspot.com",
  messagingSenderId: "892246226411",
  appId: "1:892246226411:web:1ea982007fd182880995ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
