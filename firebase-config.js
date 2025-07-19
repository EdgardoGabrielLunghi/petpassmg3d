// firebase-config.js

// Importa las funciones de los SDKs desde las URLs del CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIv7h54zklg90iSu_fmmGKJVVmXYNbTu0",
  authDomain: "petpassmg3d-7b9d4.firebaseapp.com",
  projectId: "petpassmg3d-7b9d4",
  storageBucket: "petpassmg3d-7b9d4.appspot.com",
  messagingSenderId: "753370902277",
  appId: "1:753370902277:web:ec273f6decc4e5ed8b116c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

console.log("✅ Firebase conectado correctamente");


