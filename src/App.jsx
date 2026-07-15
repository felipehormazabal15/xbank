import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { loginUser, registerUser } from "./services/auth";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";

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
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
    />
  );
}

export default App;