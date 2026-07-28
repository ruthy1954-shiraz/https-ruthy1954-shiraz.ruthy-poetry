// notes-tikshurim.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// הגדרות Firebase שלך
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ruthy1954-tikshurim.firebaseapp.com",
  projectId: "ruthy1954-tikshurim",
  storageBucket: "ruthy1954-tikshurim.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// אתחול Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🟣 טעינת הערות קיימות
export async function initTikshurimNotes(tikId) {
  try {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";

    const q = collection(db, "tik_notes_" + tikId);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <strong>${data.name}</strong><br>
        ${data.note}<br>
        <span class="note-date">${data.date}</span>
        <button class="delete-btn" data-id="${docSnap.id}">✖</button>
      `;
      notesContainer.prepend(card);
    });
  } catch (error) {
    console.error("שגיאה בטעינת הערות:", error);
  }
}

// 🟣 שמירת הערה חדשה
export async function saveTikshurimNote(name, song, note, tikId) {
  try {
    const date = new Date().toLocaleString("he-IL");
    const docRef = await addDoc(collection(db, "tik_notes_" + tikId), {
      name,
      song,
      note,
      date
    });
    return { id: docRef.id, name, note, date };
  } catch (error) {
    console.error("שגיאה בשמירת הערה:", error);
    return null;
  }
}

// 🟣 מחיקת הערה
export async function deleteTikshurimNote(noteId, tikId) {
  try {
    const noteRef = doc(db, "tik_notes_" + tikId, noteId);
    await deleteDoc(noteRef);
    console.log("הערה נמחקה בהצלחה:", noteId);
  } catch (error) {
    console.error("שגיאה במחיקת הערה:", error);
  }
}










