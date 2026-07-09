import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { transferMoney } from "../services/transfer";

import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import BalanceCard from "../components/BalanceCard";
import TransferForm from "../components/TransferForm";
import MovementList from "../components/MovementList";

import "../styles/header.css";
import "../styles/card.css";
import "../styles/form.css";
import "../styles/movement.css";
import "../styles/dashboard.css";
import "../styles/stats.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  const [emailDestino, setEmailDestino] = useState("");
  const [monto, setMonto] = useState("");

  const [movimientos, setMovimientos] = useState([]);

  const [loadingTransfer, setLoadingTransfer] = useState(false);

  // Obtener datos del usuario
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Obtener historial
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(db, "movimientos"),
      where("from", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMovimientos(lista);
    });

    return () => unsubscribe();
  }, []);

  const handleTransfer = async () => {
    if (loadingTransfer) return;

    const montoNumero = Number(monto);

    if (emailDestino.trim() === "") {
      alert("Debes ingresar el correo del destinatario.");
      return;
    }

    if (monto === "") {
      alert("Debes ingresar un monto.");
      return;
    }

    if (isNaN(montoNumero)) {
      alert("Monto inválido.");
      return;
    }

    if (montoNumero <= 0) {
      alert("El monto debe ser mayor que cero.");
      return;
    }

    if (emailDestino === userData.email) {
      alert("No puedes transferirte dinero a ti mismo.");
      return;
    }

    if (montoNumero > userData.saldo) {
      alert("Saldo insuficiente.");
      return;
    }

    try {
      setLoadingTransfer(true);

      await transferMoney(
        auth.currentUser.uid,
        emailDestino,
        montoNumero
      );

      alert("✅ Transferencia realizada correctamente.");

      setEmailDestino("");
      setMonto("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingTransfer(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!userData) {
    return <h2 className="loading">Cargando...</h2>;
  }

  return (
    <div className="dashboard">

      <Header email={userData.email} />

      <StatsCards
        saldo={userData.saldo}
        movimientos={movimientos}
      />

      <BalanceCard
        email={userData.email}
        saldo={userData.saldo}
      />

      <TransferForm
        emailDestino={emailDestino}
        setEmailDestino={setEmailDestino}
        monto={monto}
        setMonto={setMonto}
        handleTransfer={handleTransfer}
        loadingTransfer={loadingTransfer}
      />

      <MovementList movimientos={movimientos} />

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>

    </div>
  );
}

export default Dashboard;