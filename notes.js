// notes.js — מערכת הערות מרכזית לכל השירים

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// הגדרות Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMepXTjui58oUJOaVQgmXo8L0IjT1pPxQ",
    authDomain: "ruthy-notes.firebaseapp.com",
    projectId: "ruthy-notes",
    storageBucket: "ruthy-notes.firebasestorage.app",
    messagingSenderId: "276333962292",
    appId: "1:276333962292:web:298a0e8db8b5f77c359661",
    measurementId: "G-6MDZNCXET4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// שם האוסף — notes_shir1
function getCollectionName(songId) {
    return `notes_${songId}`;
}

// ⭐ שמירה בענן עם תאריך
export async function saveNoteToFirestore(name, song, note, songId, date) {
    const col = getCollectionName(songId);

    await addDoc(collection(db, col), {
        name,
        song,
        note,
        songId,
        date,
        timestamp: new Date()
    });
}

// ⭐ טעינה מהענן — מציג הערות באתר
async function loadNotes(songId) {
    const col = getCollectionName(songId);
    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = "";

    const snapshot = await getDocs(collection(db, col));

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        if (data.songId === songId) {
            const p = document.createElement("p");
            p.innerHTML = `
                <strong>${data.name}</strong>: ${data.note}
                <br><small>${data.date}</small>
                <span class="delete-note">❌</span>
            `;
            notesDiv.appendChild(p);

            // ⭐ מחיקה מהמסך בלבד
            p.querySelector(".delete-note").addEventListener("click", () => {
                p.remove();
            });
        }
    });
}

// ⭐ שמירה מקומית — מוסיף הערה למסך
function saveLocal(name, note, date) {
    const notesDiv = document.getElementById("notes");
    const p = document.createElement("p");

    p.innerHTML = `
        <strong>${name}</strong>: ${note}
        <br><small>${date}</small>
        <span class="delete-note">❌</span>
    `;

    notesDiv.appendChild(p);

    p.querySelector(".delete-note").addEventListener("click", () => {
        p.remove();
    });
}

// ⭐ הפעלת המערכת
export function initNoteSystem(songId) {

    // טעינה מהענן
    document.addEventListener("DOMContentLoaded", () => {
        loadNotes(songId);
    });

    // כפתור שמירה
    const saveLink = document.getElementById("saveLink");
    saveLink.addEventListener("click", () => {
        const name = document.getElementById("userName").value.trim();
        const song = document.getElementById("userSong").value.trim();
        const note = document.getElementById("userNote").value.trim();
        const date = new Date().toLocaleString("he-IL");

        if (!name || !note) {
            alert("נא למלא שם והערה");
            return;
        }

        // ⭐ שמירה למסך
        saveLocal(name, note, date);

        // ⭐ שמירה לענן
        saveNoteToFirestore(name, song, note, songId, date);

        alert("הערה נשמרה!");
    });
}











