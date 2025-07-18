
// preencher-ficha.js

// Configurar Firebase (ya debes tener esto en tu firebase-config.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Tu configuración (debe ser idéntica a la de firebase-config.js)
const firebaseConfig = {
  apiKey: "AIzaSyAIv7h54zklg9OisU_fmmGKJVVmXYNbTu0",
  authDomain: "petpassmg3d-7b9d4.firebaseapp.com",
  projectId: "petpassmg3d-7b9d4",
  storageBucket: "petpassmg3d-7b9d4.firebasestorage.app",
  messagingSenderId: "753370902277",
  appId: "1:753370902277:web:ec273f6decc4e5ed8b116c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Detectar número de serie desde la URL
const url = window.location.pathname;
const numeroSerie = url.substring(url.lastIndexOf("/") + 1).replace(".html", "");

// Lógica para buscar y reemplazar los datos
async function preencherFicha() {
  try {
    const docRef = doc(db, "fichas", numeroSerie);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();

      // Reemplazar todos los campos
      Object.keys(dados).forEach(chave => {
        const valor = dados[chave];

        if (chave === "foto_pet") {
          const img = document.querySelector('img[src*="[foto_pet]"]');
          if (img) img.src = `data:image/jpeg;base64,${valor}`;
        } else {
          const elementos = document.body.innerHTML;
          document.body.innerHTML = elementos.replaceAll(`[${chave}]`, valor);
        }
      });
    } else {
      alert("Ficha não encontrada para: " + numeroSerie);
    }
  } catch (e) {
    console.error("Erro ao buscar dados da ficha:", e);
    alert("Erro ao carregar os dados do pet.");
  }
}

window.addEventListener("DOMContentLoaded", preencherFicha);
