import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// TRANSFERENCIA
export const transferMoney = async (fromUid, toEmail, amount) => {
  amount = Number(amount);

  if (amount <= 0) throw new Error("Monto inválido");

  const fromRef = doc(db, "users", fromUid);
  const fromSnap = await getDoc(fromRef);

  if (!fromSnap.exists()) throw new Error("Usuario no existe");

  const fromData = fromSnap.data();

  if (fromData.saldo < amount) throw new Error("Saldo insuficiente");

  const q = query(collection(db, "users"), where("email", "==", toEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) throw new Error("Usuario destino no existe");

  const toDoc = querySnapshot.docs[0];
  const toUid = toDoc.id;
  const toData = toDoc.data();

  await updateDoc(doc(db, "users", fromUid), {
    saldo: fromData.saldo - amount
  });

  await updateDoc(doc(db, "users", toUid), {
    saldo: toData.saldo + amount
  });

  await addDoc(collection(db, "movimientos"), {
    from: fromUid,
    to: toUid,
    amount,
    type: "transfer",
    date: serverTimestamp()
  });

  return true;
};