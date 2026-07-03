import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// REGISTRO
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    saldo: 100000,
    createdAt: new Date()
  });

  return user;
};

// LOGIN
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};