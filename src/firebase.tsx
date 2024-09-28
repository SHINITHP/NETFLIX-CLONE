import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBenTlroGq3x-vbxGPDs2j_czBcwv0oQbA",
  authDomain: "netflix-clone-f878e.firebaseapp.com",
  projectId: "netflix-clone-f878e",
  storageBucket: "netflix-clone-f878e.appspot.com",
  messagingSenderId: "425436704715",
  appId: "1:425436704715:web:57bf344e68ffb4691e104e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add user details to Firestore
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!"); // Notify success
  } catch (error: any) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' ') || "Signup failed"); // Provide more detailed error message
  }
};

const login = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password); // Await the sign-in operation
    toast.success("Login successful!"); // Notify success
  } catch (error: any) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' ') || "Login failed"); // Provide more detailed error message
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth); // Await the sign-out operation
    toast.success("Logout successful!"); // Notify success
  } catch (error: any) {
    console.log(error);
    toast.error(error.message || "Logout failed"); // Provide more detailed error message
  }
};

export { auth, db, login, signup, logout };
