function tratarErrosEsperados(res, err) {
  const erroString = String(err);

  // Erro de validação do Mongoose
  if (erroString.includes("ValidationError:")) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: erroString.replace("ValidationError: ", "").replace(/:/g, ''),
      resposta: erroString
    });
  }

  // Erro manual definido pelo dev
  if (erroString.includes("Error:")) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: erroString.replace("Error: ", ""),
      resposta: erroString
    });
  }

  // Erro inesperado
  console.error(err);
  return res.status(500).json({
    status: "Erro",
    statusMensagem: "Erro interno do servidor. Tente novamente mais tarde.",
    resposta: erroString
  });
}

module.exports = tratarErrosEsperados;
