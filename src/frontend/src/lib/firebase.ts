import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMFrj1vNi-rw9VT7rH1UgRrORX0UbtI6Y",
  authDomain: "st-james-ack-malaba.firebaseapp.com",
  projectId: "st-james-ack-malaba",
  storageBucket: "st-james-ack-malaba.firebasestorage.app",
  messagingSenderId: "50638180627",
  appId: "1:50638180627:web:d3d99f6765f2f531aa4ae6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
