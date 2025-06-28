// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1pHlrRsfCCVXcbS7E1UiZPn0HlBApdxU",
  authDomain: "elearn-a517b.firebaseapp.com",
  projectId: "elearn-a517b",
  storageBucket: "elearn-a517b.appspot.com",
  messagingSenderId: "32628826824",
  appId: "1:32628826824:web:88b1e35fa655c74ada3bfd",
  measurementId: "G-TMWM7XQQ55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
