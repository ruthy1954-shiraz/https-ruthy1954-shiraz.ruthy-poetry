// firebase.js — הגדרות חיבור ל-Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdagkGJI-uuz5dbFOelzsUKJL8QpcVgn4",
  authDomain: "ruthy1954-tikshurim.firebaseapp.com",
  projectId: "ruthy1954-tikshurim",
  storageBucket: "ruthy1954-tikshurim.appspot.com",
  messagingSenderId: "681474709062",
  appId: "1:681474709062:web:9045fc05c985e81e239c47",
  measurementId: "G-EF3S4JJ8SP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };

