// ----------------------------------------------------
// 1. טעינת Firebase
// ----------------------------------------------------
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { 
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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


// ----------------------------------------------------
// 2. שמירת הערה — עכשיו לפי songId
// ----------------------------------------------------
async function saveNote() {
  const name = document.getElementById("userName").value;
  const note = document.getElementById("userNote").value;

  if (!name || !note) {
    alert("נא למלא שם והערה");
    return;
  }

  await addDoc(collection(db, "notes/" + songId), {
    name: name,
    note: note,
    timestamp: new Date()
  });

  alert("ההערה נשמרה בהצלחה!");
  loadNotes();
}


// ----------------------------------------------------
// 3. טעינת הערות — לפי songId
// ----------------------------------------------------
async function loadNotes() {
  const querySnapshot = await getDocs(collection(db, "notes/" + songId));
  let html = "";

  querySnapshot.forEach((docItem) => {
    const data = docItem.data();

    html += `
      <div class="note-item">
        <p><strong>${data.name}:</strong> ${data.note}</p>
        <button class="delete-btn" onclick="deleteNote('${docItem.id}')">מחיקה</button>
      </div>
    `;
  });

  document.getElementById("notes").innerHTML = html;
}


// ----------------------------------------------------
// 4. מחיקת הערה — לפי songId
// ----------------------------------------------------
async function deleteNote(id) {
  if (!confirm("למחוק את ההערה?")) return;

  await deleteDoc(doc(db, "notes/" + songId, id));
  loadNotes();
}


// ----------------------------------------------------
// 5. עדכון קישור וואטסאפ
// ----------------------------------------------------
function updateWhatsAppLink() {
  const name = document.getElementById("userName").value;
  const note = document.getElementById("userNote").value;

  const text = `שם: ${name}\nהערה: ${note}`;
  const url = "https://wa.me/972545305123?text=" + encodeURIComponent(text);

  document.getElementById("waLink").href = url;
}


// ----------------------------------------------------
// 6. הפעלת המערכת
// ----------------------------------------------------
export function initNoteSystem() {
  document.getElementById("userName").addEventListener("input", updateWhatsAppLink);
  document.getElementById("userNote").addEventListener("input", updateWhatsAppLink);
  document.getElementById("saveBtn").addEventListener("click", saveNote);

  loadNotes();
}


// ----------------------------------------------------
// 7. חשיפת פונקציות למחיקה
// ----------------------------------------------------
window.deleteNote = deleteNote;



