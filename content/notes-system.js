// -----------------------------
// Firebase Initialization
// -----------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// -----------------------------
// Save note to Firebase
// -----------------------------
export async function saveNoteToCloud(name, note, songId, songTitle) {
  await addDoc(collection(db, "notes_51"), {
    name,
    note,
    songId,
    songTitle,
    timestamp: new Date()
  });
}

// -----------------------------
// Delete note from Firebase
// -----------------------------
async function deleteNoteFromCloud(noteId) {
  await deleteDoc(doc(db, "notes_51", noteId));
}

// -----------------------------
// Load notes from Firebase
// -----------------------------
export async function loadNotesFromCloud(songId) {
  const notesDiv = document.getElementById("notes");
  if (!notesDiv) return;

  notesDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "notes_51"));
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    if (data.songId === songId) {

      // עטיפה לכל הערה
      const wrapper = document.createElement("div");
      wrapper.classList.add("note-item");

      // טקסט ההערה
      const p = document.createElement("p");
      p.textContent = `${data.name}: ${data.note}`;

      // תאריך
      const date = new Date(data.timestamp.seconds * 1000).toLocaleString("he-IL");
      const dateSpan = document.createElement("span");
      dateSpan.textContent = ` (${date})`;
      dateSpan.classList.add("note-date");
      p.appendChild(dateSpan);

      // כפתור מחיקה ❌
      const del = document.createElement("span");
      del.textContent = "❌";
      del.classList.add("delete-note");

      del.addEventListener("click", () => {
        wrapper.remove();
        deleteNoteFromCloud(docSnap.id);
      });

      wrapper.appendChild(p);
      wrapper.appendChild(del);
      notesDiv.appendChild(wrapper);
    }
  });
}

// -----------------------------
// Local save (display on page)
// -----------------------------
export function saveNoteLocally(name, note) {
  const notesDiv = document.getElementById("notes");

  const wrapper = document.createElement("div");
  wrapper.classList.add("note-item");

  const p = document.createElement("p");
  p.textContent = `${name}: ${note}`;

  const dateSpan = document.createElement("span");
  dateSpan.textContent = ` (${new Date().toLocaleString("he-IL")})`;
  dateSpan.classList.add("note-date");
  p.appendChild(dateSpan);

  const del = document.createElement("span");
  del.textContent = "❌";
  del.classList.add("delete-note");

  del.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.appendChild(p);
  wrapper.appendChild(del);
  notesDiv.appendChild(wrapper);
}

// -----------------------------
// Email sending (Formspree)
// -----------------------------
export function sendEmail(name, mail, songTitle, note) {
  fetch("https://formspree.io/f/xkoddqww", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_name: name,
      user_mail: mail,
      user_song: songTitle,
      user_note: note
    })
  });
}

// -----------------------------
// WhatsApp message
// -----------------------------
export function sendWhatsApp(name, songTitle, note) {
  const phone = "972545305123";
  const message =
    `שם הכותב: ${name}\n` +
    `שם השיר: ${songTitle}\n` +
    `הערה: ${note}`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}

// -----------------------------
// Main buttons logic
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

  if (window.songId) {
    loadNotesFromCloud(window.songId);
  }

  const sendAll = document.getElementById("sendAll");
  const waLink = document.getElementById("waLink");

  if (sendAll) {
    sendAll.addEventListener("click", () => {

      const name = document.getElementById("userName").value.trim();
      const mail = document.getElementById("userMail").value.trim();
      const songTitle = document.getElementById("userSong").value.trim();
      const note = document.getElementById("userNote").value.trim();

      if (!name || !mail || !note) {
        alert("נא למלא שם, מייל והערה");
        return;
      }

      saveNoteLocally(name, note);
      saveNoteToCloud(name, note, window.songId, songTitle);
      sendEmail(name, mail, songTitle, note);

      alert("הערה נשמרה באתר, נשלחה למייל ונשמרה בענן");
    });
  }

  if (waLink) {
    waLink.addEventListener("click", () => {
      const name = document.getElementById("userName").value.trim();
      const songTitle = document.getElementById("userSong").value.trim();
      const note = document.getElementById("userNote").value.trim();

      sendWhatsApp(name, songTitle, note);
    });
  }

  const toggleBtn = document.querySelector(".toggle-notes");
  const notesBox = document.querySelector(".notes-box");

  if (toggleBtn && notesBox) {
    toggleBtn.addEventListener("click", () => {
      notesBox.classList.toggle("hidden");

      toggleBtn.textContent = notesBox.classList.contains("hidden")
        ? "הערות והארות"
        : "הסתרת הערות";
    });
  }
});

