import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      if (isLogin) {
        // Login only uses email + password
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store username in Firestore (linked to UID)
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email
        });
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {!isLogin && (
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isLogin ? "Create an account" : "Have an account? Login"}
      </p>
    </form>
  );
}
