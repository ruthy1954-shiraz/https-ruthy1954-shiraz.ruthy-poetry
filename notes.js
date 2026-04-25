import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* הגדרות Firebase שלך */
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "ruthy-notes",
    storageBucket: "ruthy-notes.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* שמירת הערה */
export async function saveNoteToFirestore(name, song, note, songId) {
    await addDoc(collection(db, "notes_" + songId), {
        name: name,
        song: song,
        note: note,
        timestamp: Date.now()
    });
    loadNotes(songId);
}

/* טעינת הערות */
export async function initNoteSystem() {
    loadNotes(songId);
}

async function loadNotes(songId) {
    const notesDiv = document.getElementById("notes");

    const q = query(
        collection(db, "notes_" + songId),
        orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);

    notesDiv.innerHTML = "";

    querySnapshot.forEach((docItem) => {
        const data = docItem.data();
        const id = docItem.id;

        const date = new Date(data.timestamp).toLocaleDateString("he-IL");

        notesDiv.innerHTML += `
            <div class="note-card">
                <div class="note-delete" onclick="deleteNote('${id}')">×</div>
                <strong>${data.name}</strong><br>
                <small>${data.song} — ${date}</small><br><br>
                ${data.note}
            </div>
        `;
    });
}

/* מחיקת הערה */
window.deleteNote = async function(id) {
    await deleteDoc(doc(db, "notes_" + songId, id));
    loadNotes(songId);
}


