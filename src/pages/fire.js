// 🔹 Imports (always on top)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// ❌ analytics zaroori nahi abhi, isliye hata diya

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAzAI8H1DK8D71VcB-WxBFFSxr7t-5I9_Q",
  authDomain: "myproductsapp-b1cb2.firebaseapp.com",
  projectId: "myproductsapp-b1cb2",
  storageBucket: "myproductsapp-b1cb2.appspot.com",
  messagingSenderId: "390078274624",
  appId: "1:390078274624:web:54203d010372e54cf213a5",
  measurementId: "G-T8HPZDV0MN",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Firestore export
export const db = getFirestore(app);
