// notes-tikshurim.js — מערכת הערות לתקשורים

// טעינת ספריות Firebase ישירות מהשרת הרשמי
import { app } from "./firebase.js";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// יצירת חיבור למסד הנתונים
const db = getFirestore(app);


// ⭐ טעינת הערות של התקשור
export async function initTikshurimNotes(tikId) {
    const notesDiv = document.getElementById("notes");

    const q = query(
        collection(db, "tik_notes_" + tikId),
        orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);

    notesDiv.innerHTML = "";

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        const card = document.createElement("div");
        card.className = "note-card";

        card.innerHTML = `
            <strong>${data.name}</strong><br>
            ${data.note}<br>
            <span class="note-date">${data.date}</span>
            <button class="delete-btn" data-id="${docSnap.id}">✖</button>
        `;

        // מחיקה
        card.querySelector(".delete-btn").addEventListener("click", async () => {
            await deleteDoc(doc(db, "tik_notes_" + tikId, docSnap.id));
            card.remove();
        });

        notesDiv.appendChild(card);
    });
}


// ⭐ שמירת הערה חדשה
export async function saveTikshurimNote(name, song, note, tikId) {
    const docRef = await addDoc(collection(db, "tik_notes_" + tikId), {
        name,
        song,
        note,
        date: new Date().toLocaleString("he-IL")
    });

    return {
        id: docRef.id,
        name,
        note,
        date: new Date().toLocaleString("he-IL")
    };
}

export { db };









