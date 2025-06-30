const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

admin.initializeApp();

exports.updateFicha = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const {
    numeroSerie,
    idade,
    telefone,
    vacinas,
    data_atendimento,
    data_visita,
    observacoes_atendimento,
    clinica
  } = req.body;

  const filePath = path.join(__dirname, "..", "public", "fichas", `${numeroSerie}.html`);

  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).send("Erro ao ler a ficha");
    }

    let atualizado = html
      .replace(/(<strong>Idade:<\/strong>\s*)([^<]*)/, `$1${idade}`)
      .replace(/(<strong>Telefone:<\/strong>\s*<a[^>]*>)([^<]*)/, `$1${telefone}`)
      .replace(/(<strong>Vacinas:<\/strong>\s*)([^<]*)/, `$1${vacinas}`)
      .replace(/(<strong>Data do Último Atendimento:<\/strong>\s*)([^<]*)/, `$1${data_atendimento}`)
      .replace(/(<strong>Próxima Visita:<\/strong>\s*)([^<]*)/, `$1${data_visita}`)
      .replace(/(<strong>Observações:<\/strong>\s*)([^<]*)/, `$1${observacoes_atendimento}`)
      .replace(/(<strong>Clínica:<\/strong>\s*)([^<]*)/, `$1${clinica}`);

    fs.writeFile(filePath, atualizado, "utf8", (err) => {
      if (err) {
        console.error("Erro ao salvar:", err);
        return res.status(500).send("Erro ao salvar a ficha");
      }
      return res.send("Ficha atualizada com sucesso!");
    });
  });
});
