//firebase/auth.js
import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Register
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export function logout() {
  return signOut(auth);
}