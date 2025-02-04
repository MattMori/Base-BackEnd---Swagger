const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const esquemaUsuario = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Hash da senha antes de salvar no banco
esquemaUsuario.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar senhas
esquemaUsuario.methods.compararSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", esquemaUsuario);
module.exports = Usuario;
