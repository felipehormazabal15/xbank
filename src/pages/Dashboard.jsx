import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [movimientos, setMovimientos] = useState([]);

  // USUARIO EN TIEMPO REAL
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) setUserData(snap.data());
    });

    return () => unsubscribe();
  }, []);

  // MOVIMIENTOS
  useEffect(() => {
    const q = query(collection(db, "movimientos"));

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => doc.data());
      setMovimientos(data);
    });

    return () => unsubscribe();
  }, []);

  const handleTransfer = async () => {
    try {
      const { transferMoney } = await import("../services/transfer");

      await transferMoney(auth.currentUser.uid, email, amount);

      alert("Transferencia exitosa 💸");

      setEmail("");
      setAmount("");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  if (!userData) return <h2>Cargando...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🏦 XBank</h1>

      <h2>Bienvenido: {userData.email}</h2>
      <h2>💰 Saldo: ${userData.saldo}</h2>

      <hr />

      <h3>Transferir dinero</h3>

      <input
        placeholder="Email destino"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Monto"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={handleTransfer}>
        Enviar dinero
      </button>

      <hr />

      <h3>📜 Movimientos</h3>

      {movimientos.map((m, i) => (
        <div key={i}>
          <p>${m.amount} - {m.type}</p>
        </div>
      ))}

      <br />

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;