// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdagkGJI-uuz5dbFOelzsUKJL8QpcVgn4",
  authDomain: "ruthy1954-tikshurim.firebaseapp.com",
  projectId: "ruthy1954-tikshurim",
  storageBucket: "ruthy1954-tikshurim.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX", // המספר שמופיע אצלך
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX" // גם זה מופיע אצלך
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



