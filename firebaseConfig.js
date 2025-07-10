// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4288gpTCP8-EpopUx2z9e-ZTQBLT8-FE",
  authDomain: "artemis-339b3.firebaseapp.com",
  projectId: "artemis-339b3",
  storageBucket: "artemis-339b3.firebasestorage.app",
  messagingSenderId: "271138052999",
  appId: "1:271138052999:web:a2039bbe83559f48381122",
  measurementId: "G-JHRXKS8VX9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
