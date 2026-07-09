import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { loginUser, registerUser } from "./services/auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      await registerUser(email, password);

      alert("Usuario registrado correctamente.");

      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);

      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Cargando...
      </h2>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          color: "white",
          boxShadow: "0 0 20px rgba(0,0,0,.3)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🏦 XBank</h1>

        <p style={{ textAlign: "center", color: "#cbd5e1" }}>
          Mi Banco Digital
        </p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Iniciar sesión
        </button>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default App;