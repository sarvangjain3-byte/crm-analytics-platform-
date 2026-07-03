import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "white", display: "grid", placeItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: 380, background: "#0f172a", padding: 28, borderRadius: 20 }}>
        <h1>SGE CRM Pro</h1>
        <p>{mode === "login" ? "Login to your CRM" : "Create your CRM account"}</p>

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "#fb7185" }}>{error}</p>}

        <button style={buttonStyle}>
          {mode === "login" ? "Login" : "Create account"}
        </button>

        <p
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          style={{ cursor: "pointer", color: "#38bdf8", marginTop: 18 }}
        >
          {mode === "login" ? "Need an account? Create one" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "18px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};