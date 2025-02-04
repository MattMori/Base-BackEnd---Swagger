const express = require('express');
const router = express.Router();
//const conectarBancoDados = require('../middlewares/conectarBD');
//const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken')
//const EsquemaUsuario = require('../models/usuario');
//const authToken = require('../middlewares/authToken'); 


router.post('/exemplo', async (req, res) => {
  try {
    const { Exemplo } = req.body;
    const ExemploCriado = await EsquemaExemplo.create({ Exemplo });
    return res.status(201).json(ExemploCriado);
  } catch (err) {
    return tratarErrosEsperados(res, err);
  }
});

router.get('/exemplo', async (req, res) => {
  try {
    const exemplos = await EsquemaExemplo.find();
    return res.status(200).json(exemplos);
  } catch (err) {
    return tratarErrosEsperados(res, err);
  }
});

module.exports = router;
