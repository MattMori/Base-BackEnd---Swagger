const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  {
      Exemplo: {
          type: String,
          required: true,
          unique: true
      }
  }
);

const EsquemaExemplo = mongoose.models.Exemplo || mongoose.model('Exemplo', esquema);
module.exports = EsquemaExemplo;
