//firebase/config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwc9VnrebnfDRgOcPvn3op7T26JHvd9zA",
  authDomain: "productivitytracker-1257d.firebaseapp.com",
  projectId: "productivitytracker-1257d",
  storageBucket: "productivitytracker-1257d.firebasestorage.app",
  messagingSenderId: "96643445346",
  appId: "1:96643445346:web:2902e6076d88e7c9b9d73b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;