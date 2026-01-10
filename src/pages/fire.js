// 🔹 Imports (always on top)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ❌ analytics zaroori nahi abhi, isliye hata diya

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_APP_ID
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Firestore export
export const db = getFirestore(app);
