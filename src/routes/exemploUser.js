const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/exemploUser");
const tratarErrosEsperados = require("../functions/tratarErrosEsperados");
require("dotenv").config();

const router = express.Router();

// Registrar um novo usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const novoUsuario = await Usuario.create({ nome, email, senha });

    return res.status(201).json({ message: "Usuário criado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

// Login do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
