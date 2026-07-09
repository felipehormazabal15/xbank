import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

// ===============================
// REGISTRAR USUARIO
// ===============================
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Crear documento del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      saldo: 100000,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===============================
// INICIAR SESIÓN
// ===============================
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};