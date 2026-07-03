import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function listenToLeads(userId, callback) {
  const q = query(
    collection(db, "users", userId, "leads"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(leads);
  });
}

export async function addLead(userId, lead) {
  return addDoc(collection(db, "users", userId, "leads"), {
    ...lead,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateLead(userId, leadId, lead) {
  return updateDoc(doc(db, "users", userId, "leads", leadId), {
    ...lead,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteLead(userId, leadId) {
  return deleteDoc(doc(db, "users", userId, "leads", leadId));
}