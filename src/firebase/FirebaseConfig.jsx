/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJHixjZPtzOm5w5govhhhNUOZlGWyNz5I",
  authDomain: "myfirstapp-6a314.firebaseapp.com",
  projectId: "myfirstapp-6a314",
  storageBucket: "myfirstapp-6a314.appspot.com",
  messagingSenderId: "210658166142",
  appId: "1:210658166142:web:c83194cb680c0f928a9f2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Export fireDB and auth as named exports
export { fireDB, auth };
