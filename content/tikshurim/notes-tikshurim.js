// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdagkGJI-uuz5dbFOelzsUKJL8QpcVgn4",
  authDomain: "ruthy1954-tikshurim.firebaseapp.com",
  projectId: "ruthy1954-tikshurim",
  storageBucket: "ruthy1954-tikshurim.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⭐ פונקציה ששומרת הערה בענן
export async function saveNote(name, note, date) {
  await addDoc(collection(db, "tik_notes_03-09-2023"), {
    name,
    note,
    date
  });
}

// מייצאים את db למקרה שהקובץ הראשי צריך אותו
export { db };




