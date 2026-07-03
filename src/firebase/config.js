import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqFk4_4cgbuRDk8hi6ioIN6E6srd_P3qs",
  authDomain: "sge-sales-crm.firebaseapp.com",
  projectId: "sge-sales-crm",
  storageBucket: "sge-sales-crm.firebasestorage.app",
  messagingSenderId: "937485645577",
  appId: "1:937485645577:web:39eb1e804d387650be85d8",
  measurementId: "G-GZ9JH79C33"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);