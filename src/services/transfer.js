import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// =====================================
// TRANSFERIR DINERO ENTRE USUARIOS
// =====================================
export const transferMoney = async (fromUid, toEmail, amount) => {
  amount = Number(amount);

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Ingrese un monto válido.");
  }

  // Documento del usuario que envía
  const fromRef = doc(db, "users", fromUid);

  // Buscar usuario destino por email
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("email", "==", toEmail));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("El usuario destino no existe.");
  }

  const toDoc = querySnapshot.docs[0];
  const toRef = doc(db, "users", toDoc.id);

  // Evitar enviarse dinero a sí mismo
  if (toDoc.id === fromUid) {
    throw new Error("No puedes transferirte dinero a ti mismo.");
  }

  // Transacción para actualizar ambos saldos
  await runTransaction(db, async (transaction) => {
    const fromSnap = await transaction.get(fromRef);
    const toSnap = await transaction.get(toRef);

    if (!fromSnap.exists()) {
      throw new Error("Usuario emisor no encontrado.");
    }

    if (!toSnap.exists()) {
      throw new Error("Usuario destino no encontrado.");
    }

    const fromData = fromSnap.data();
    const toData = toSnap.data();

    if (fromData.saldo < amount) {
      throw new Error("Saldo insuficiente.");
    }

    transaction.update(fromRef, {
      saldo: fromData.saldo - amount,
    });

    transaction.update(toRef, {
      saldo: toData.saldo + amount,
    });
  });

  // Guardar movimiento
  await addDoc(collection(db, "movimientos"), {
    from: fromUid,
    to: toDoc.id,
    toEmail: toEmail,
    amount: amount,
    type: "Transferencia",
    date: serverTimestamp(),
  });

  return true;
};