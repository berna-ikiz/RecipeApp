// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmdbOv74SaIK5fbtGWj3lFYkMmn8046aM",
  authDomain: "recipeapp-523ad.firebaseapp.com",
  projectId: "recipeapp-523ad",
  storageBucket: "recipeapp-523ad.firebasestorage.app",
  messagingSenderId: "46244849771",
  appId: "1:46244849771:web:fd49d8170304bae638292e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);