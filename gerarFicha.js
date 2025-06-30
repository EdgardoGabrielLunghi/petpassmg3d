// gerarFicha.js (versão final)
// Gera uma ficha HTML a partir do modelo_petpass.html

const fs = require('fs');
const path = require('path');

// Simulação de dados recebidos
const dados = {
  numeroSerie: "PP-12837",
  nomePet: "Thor",
  especie: "Gato",
  raca: "Persa",
  idade: "2 anos",
  cor: "Cinza",
  nomeTutor: "Maria Souza",
  telefone: "31988887777",
  endereco: "Rua dos Bichinhos, 456",
  email: "maria@email.com",
  fotoPet: "https://placekitten.com/300/300" // <- URL ou caminho local da foto
};

// Função que gera o HTML com base no modelo
function gerarHTML(dados) {
  let modelo = fs.readFileSync(path.join(__dirname, 'modelo_petpass.html'), 'utf8');

  // Substituições básicas
  modelo = modelo.replace(/{{nome_pet}}/g, dados.nomePet);
  modelo = modelo.replace(/{{numero_serie}}/g, dados.numeroSerie);
  modelo = modelo.replace(/{{especie}}/g, dados.especie);
  modelo = modelo.replace(/{{raca}}/g, dados.raca);
  modelo = modelo.replace(/{{idade}}/g, dados.idade);
  modelo = modelo.replace(/{{cor}}/g, dados.cor);
  modelo = modelo.replace(/{{nome_tutor}}/g, dados.nomeTutor);
  modelo = modelo.replace(/{{telefone}}/g, dados.telefone);
  modelo = modelo.replace(/{{endereco}}/g, dados.endereco);
  modelo = modelo.replace(/{{email}}/g, dados.email);
  modelo = modelo.replace(/{{foto_pet}}/g, dados.fotoPet || "");

  // Botões de ação
  const linkWhatsApp = `https://wa.me/55${dados.telefone}?text=Ol%C3%A1%21+Encontrei+seu+pet%21`;
  const linkGeo = `https://petpassmg3d.github.io/petpass-localizacao/localizacao.html?numero=55${dados.telefone}`;

  modelo = modelo.replace(/{{botao_whatsapp}}/g, linkWhatsApp);
  modelo = modelo.replace(/{{botao_localizacao}}/g, linkGeo);

  return modelo;
}

// Caminho de saída
const pastaFichas = path.join(__dirname, 'fichas');
if (!fs.existsSync(pastaFichas)) {
  fs.mkdirSync(pastaFichas);
}

const caminhoFicha = path.join(pastaFichas, `${dados.numeroSerie}.html`);
fs.writeFileSync(caminhoFicha, gerarHTML(dados), 'utf8');
console.log(`✅ Ficha gerada: ${caminhoFicha}`);

