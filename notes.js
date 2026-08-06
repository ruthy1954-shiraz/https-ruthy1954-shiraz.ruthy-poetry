// notes.js — שמירה בענן + שליחת מייל מעוצב דרך Formspree

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

// שם האוסף בפורמט notes_shirX
function getCollectionName(songId) {
    return `notes_${songId}`;
}

// שליחת מייל מעוצב דרך Formspree
async function sendEmail(name, email, song, note, date, link) {

    const message = `
📬 התקבלה הערה חדשה באתר השירים

👤 שם הכותב:
${name}

📧 כתובת מייל:
${email}

🎵 שם השיר:
${song}

🕒 תאריך ושעה:
${date}

💬 תוכן ההערה:
${note}

🔗 קישור לשיר באתר:
${link}
    `;

    await fetch("https://formspree.io/f/xkoddqww", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: message
        })
    });
}

// שמירה בענן
export async function saveNoteToFirestore(name, email, song, note, songId, date, link) {
    const col = getCollectionName(songId);

    await addDoc(collection(db, col), {
        name,
        email,
        song,
        note,
        songId,
        date,
        link,
        timestamp: new Date()
    });

    sendEmail(name, email, song, note, date, link);
}

// טעינה מהענן
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
                <strong>${data.name}</strong> (${data.email})<br>
                ${data.note}<br>
                <small>${data.date}</small><br>
                <a href="${data.link}" target="_blank">קישור לשיר</a>
                <span class="delete-note">❌</span>
            `;
            notesDiv.appendChild(p);

            p.querySelector(".delete-note").addEventListener("click", () => {
                p.remove();
            });
        }
    });
}

// שמירה מקומית
function saveLocal(name, email, note, date, link) {
    const notesDiv = document.getElementById("notes");
    const p = document.createElement("p");

    p.innerHTML = `
        <strong>${name}</strong> (${email})<br>
        ${note}<br>
        <small>${date}</small><br>
        <a href="${link}" target="_blank">קישור לשיר</a>
        <span class="delete-note">❌</span>
    `;

    notesDiv.appendChild(p);

    p.querySelector(".delete-note").addEventListener("click", () => {
        p.remove();
    });
}

// הפעלת המערכת
export function initNoteSystem(songId) {

    document.addEventListener("DOMContentLoaded", () => {
        loadNotes(songId);
    });

    const saveLink = document.getElementById("saveLink");
    saveLink.addEventListener("click", () => {
        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userMail").value.trim();
        const song = document.getElementById("userSong").value.trim();
        const note = document.getElementById("userNote").value.trim();
        const date = new Date().toLocaleString("he-IL");
        const link = window.location.href;

        if (!name || !note) {
            alert("נא למלא שם והערה");
            return;
        }

        saveLocal(name, email, note, date, link);
        saveNoteToFirestore(name, email, song, note, songId, date, link);

        alert("הערה נשמרה ונשלחה!");
    });
}











