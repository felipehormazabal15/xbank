import { useState } from "react";
import { loginUser, registerUser } from "./services/auth";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  const handleRegister = async () => {
    await registerUser(email, password);
  };

  const handleLogin = async () => {
    await loginUser(email, password);
  };

  if (user) return <Dashboard />;

  return (
    <div style={{ padding: 20 }}>
      <h1>XBank</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Registrarse
      </button>

      <button onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default App;