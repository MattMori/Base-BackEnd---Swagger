const mongoose = require('mongoose');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function conectarBancoDados(req = null, res = null, next = null) {
  try {
    // Tentando conectar ao banco de dados
    console.log('Tentando conectar ao banco de dados...');
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conectado ao banco de dados com sucesso!');

    // Chama o próximo middleware ou controlador
    if (next) next();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    tratarErrosEsperados(null, new Error('Erro ao conectar no banco de dados'));
  }
}

module.exports = conectarBancoDados;
