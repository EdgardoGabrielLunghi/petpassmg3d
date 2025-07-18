// === Configuração Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyAIv7h54zklg9OisU_fmmGKJVVmXYNbTu0",
  authDomain: "petpassmg3d-7b9d4.firebaseapp.com",
  projectId: "petpassmg3d-7b9d4",
  storageBucket: "petpassmg3d-7b9d4.firebasestorage.app",
  messagingSenderId: "753370902277",
  appId: "1:753370902277:web:ec273f6decc4e5ed8b116c"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === 1. Obter número de série do nome do arquivo ===
const caminho = window.location.pathname;
const partes = caminho.split('/');
const nomeArquivo = partes[partes.length - 1]; // ex: PP-1234.html
const numeroSerie = nomeArquivo.replace('.html', '');

// === 2. Buscar dados no Firestore ===
db.collection("fichas").doc(numeroSerie).get().then((doc) => {
  if (doc.exists) {
    const dados = doc.data();

    // === 3. Substituir marcadores no HTML ===
    for (const campo in dados) {
      const valor = dados[campo];
      document.body.innerHTML = document.body.innerHTML.replaceAll(`[${campo}]`, valor);
    }

  } else {
    document.body.innerHTML = `<h2 style="text-align:center;color:red;">Ficha não encontrada para o número de série ${numeroSerie}</h2>`;
  }
}).catch((error) => {
  document.body.innerHTML = `<h2 style="text-align:center;color:red;">Erro ao carregar os dados</h2><p>${error}</p>`;
});
