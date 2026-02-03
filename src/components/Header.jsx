// src/components/Header.jsx
import { auth } from "../firebase/config";
import { signOut, reload } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [displayName, setDisplayName] = useState("");
  
  useEffect(() => {
    const updateDisplayName = async () => {
      if (auth.currentUser) {
        // Reload to ensure we have the latest user data
        await reload(auth.currentUser);
        setDisplayName(auth.currentUser.displayName || auth.currentUser.email);
      }
    };
    updateDisplayName();
  }, []);

  //  const handleLogout = async () => {
  //   await signOut(auth);
  // };

  return (
    <header className="header">
      <h1>Welcome, {displayName}</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
    </header>
  );
}
