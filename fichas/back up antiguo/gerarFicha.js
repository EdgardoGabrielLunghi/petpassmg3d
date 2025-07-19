// gerarFicha.js (versão final)
// Esse script gera uma ficha HTML para um pet com base nos dados recebidos.
// Para executar localmente: usar Node.js

const fs = require('fs');
const path = require('path');

// Simulação de dados recebidos do formulário (podes substituir por leitura de JSON ou API)
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
  email: "maria@email.com"
};

// Gera o conteúdo HTML da ficha
function gerarHTML(dados) {
  const linkWhatsApp = `https://wa.me/55${dados.telefone}?text=Ol%C3%A1%21+Encontrei+seu+pet%21`;
  const linkGeo = `https://petpassmg3d.github.io/petpass-localizacao/localizacao.html?numero=55${dados.telefone}`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ficha ${dados.numeroSerie}</title>
  <style>
    body { font-family: sans-serif; max-width: 700px; margin: 30px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    h1 { text-align: center; }
    .botao { display: inline-block; margin: 10px 5px; padding: 10px 15px; background: #0077cc; color: white; text-decoration: none; border-radius: 5px; }
    .botao:hover { background: #005fa3; }
  </style>
</head>
<body>
  <h1>🐾 Ficha do Pet - ${dados.nomePet}</h1>
  <p><strong>Número de Série:</strong> ${dados.numeroSerie}</p>
  <p><strong>Espécie:</strong> ${dados.especie}</p>
  <p><strong>Raça:</strong> ${dados.raca}</p>
  <p><strong>Idade:</strong> ${dados.idade}</p>
  <p><strong>Cor:</strong> ${dados.cor}</p>
  <hr/>
  <p><strong>Tutor:</strong> ${dados.nomeTutor}</p>
  <p><strong>Telefone:</strong> <a href="${linkWhatsApp}" target="_blank">${dados.telefone}</a></p>
  <p><strong>Endereço:</strong> ${dados.endereco}</p>
  <p><strong>E-mail:</strong> <a href="mailto:${dados.email}">${dados.email}</a></p>

  <hr/>
  <a class="botao" href="${linkWhatsApp}" target="_blank">📱 Enviar mensagem ao tutor</a>
  <a class="botao" href="${linkGeo}" target="_blank">📍 Enviar localização</a>
  <a class="botao" href="#" onclick="window.print()">🖨️ Salvar em PDF</a>

  <hr/>
  <p style="font-size: 0.8em; text-align: center;">Documento gerado automaticamente por Pet Pass MG3D</p>
</body>
</html>
`;
}

// Caminho do arquivo
const pastaFichas = path.join(__dirname, 'fichas');
if (!fs.existsSync(pastaFichas)) {
  fs.mkdirSync(pastaFichas);
}
const caminhoFicha = path.join(pastaFichas, `${dados.numeroSerie}.html`);

// Criação do arquivo
fs.writeFileSync(caminhoFicha, gerarHTML(dados), 'utf8');
console.log(`✅ Ficha gerada: ${caminhoFicha}`);
