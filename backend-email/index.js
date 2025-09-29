// =======================
// CONFIGURAÇÕES INICIAIS
// =======================
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// MIDDLEWARES
// =======================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Permitir requisições CORS apenas do seu site
app.use((req, res, next) => {
  // no futuro substitua "*" pelo domínio do seu site
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// =======================
// ROTA DE TESTE
// =======================
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// =======================
// ROTA DO FORMULÁRIO
// =======================
app.post("/enviar-email", async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true para 465, false para 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Conteúdo do email
    const mailOptions = {
      from: `"${nome}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL, // email da empresa que vai receber
      subject: assunto,
      text: mensagem,
      html: `<p><strong>Nome:</strong> ${nome}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Assunto:</strong> ${assunto}</p>
             <p><strong>Mensagem:</strong><br>${mensagem}</p>`,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    res
      .status(500)
      .json({ error: "Erro ao enviar mensagem. Tente novamente." });
  }
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
