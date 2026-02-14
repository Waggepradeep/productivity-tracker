import { useAuth } from "../context/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const displayName = user?.displayName || user?.email || "User";

  return (
    <header className="header">
      <h1>Welcome, {displayName}</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
