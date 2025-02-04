const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  const token = req.headers['x-auth-token'];

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(400).json({ status: "Erro", statusMensagem: "Token de autenticação não fornecido" });
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; // Adiciona o ID do usuário ao request
    next(); // Chama o próximo middleware ou rota
  } catch (error) {
    return res.status(400).json({ status: "Erro", statusMensagem: "Token de autenticação inválido" });
  }
}

module.exports = authToken;
