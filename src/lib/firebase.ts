import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMu_ClzujdJ1ExDiZB5SdZyyNxVygUrfc",
  authDomain: "scaling-smb.firebaseapp.com",
  projectId: "scaling-smb",
  storageBucket: "scaling-smb.firebasestorage.app",
  messagingSenderId: "366823459704",
  appId: "1:366823459704:web:e4c254b51171b573cf168d",
  measurementId: "G-5721RQSKSN"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
