// notes-tikshurim.js — גרסה יציבה כמו notes.js של השירים

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ⭐ הגדרות Firebase — חייבים להיות אמיתיים
const firebaseConfig = {
    apiKey: "AIzaSyC-7mYVgYc8YVYVYVYVYVYVYVYVYVY",
    authDomain: "ruthy1954-shiraz.firebaseapp.com",
    projectId: "ruthy1954-shiraz",
    storageBucket: "ruthy1954-shiraz.appspot.com",
    messagingSenderId: "1029384756",
    appId: "1:1029384756:web:abcdef1234567890"
};

// ⭐ אתחול Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⭐ טעינת הערות
export async function initTikshurimNotes(tikId) {
    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = "";

    const collectionName = "tik_notes_" + tikId;

    try {
        const snap = await getDocs(collection(db, collectionName));

        snap.forEach((docSnap) => {
            const data = docSnap.data();

            const card = document.createElement("div");
            card.className = "note-card";
            card.innerHTML = `
                <strong>${data.name}</strong><br>
                ${data.note}<br>
                <span class="note-date">${data.date}</span>
                <button class="delete-btn" data-id="${docSnap.id}">✖</button>
            `;

            notesDiv.prepend(card);
        });

    } catch (error) {
        console.error("שגיאה בטעינה:", error);
        alert("לא ניתן לטעון את ההערות כרגע.");
    }

    // ⭐ מחיקה
    notesDiv.addEventListener("click", async (e) => {
        if (!e.target.classList.contains("delete-btn")) return;

        const id = e.target.getAttribute("data-id");

        try {
            await deleteDoc(doc(db, collectionName, id));
            e.target.closest(".note-card").remove();
        } catch (error) {
            console.error("שגיאה במחיקה:", error);
            alert("לא ניתן למחוק את ההערה כרגע.");
        }
    });
}

// ⭐ שמירת הערה
export async function saveTikshurimNote(name, tik, note, tikId) {
    if (!name || !note) {
        alert("נא למלא שם והערה.");
        return null;
    }

    const now = new Date();
    const dateString = now.toLocaleString("he-IL");

    const collectionName = "tik_notes_" + tikId;

    try {
        const docRef = await addDoc(collection(db, collectionName), {
            name,
            tik,
            note,
            date: dateString
        });

        return {
            id: docRef.id,
            name,
            note,
            date: dateString
        };

    } catch (error) {
        console.error("שגיאה בשמירה:", error);
        alert("לא ניתן לשמור את ההערה כרגע.");
        return null;
    }
}


