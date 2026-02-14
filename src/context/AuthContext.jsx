import { useMemo, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email, password, username) => {
    if (!auth) throw new Error("App is not configured. Check Firebase environment variables.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (username) {
      await updateProfile(userCredential.user, { displayName: username });
      setUser({ ...userCredential.user, displayName: username });
    }
    return userCredential;
  };

  const login = (email, password) => {
    if (!auth) throw new Error("App is not configured. Check Firebase environment variables.");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (!auth) throw new Error("App is not configured. Check Firebase environment variables.");
    return signOut(auth);
  };
  const value = useMemo(() => ({ user, loading, signup, login, logout }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
