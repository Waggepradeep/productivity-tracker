// src/components/Header.jsx
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Header() {
  const user = auth.currentUser;

  //  const handleLogout = async () => {
  //   await signOut(auth);
  // };

  return (
    <header className="header">
      <h1>Welcome, {user?.displayName || user?.email}</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
    </header>
  );
}
