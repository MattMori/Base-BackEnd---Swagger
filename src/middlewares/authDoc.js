async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;
    const isLocal = req.headers.host.includes("localhost");
    const isDocRoute = req.originalUrl === "/doc/";

    if (isLocal || !isDocRoute) {
        return next(); // Libera acesso em localhost ou rotas diferentes
    }

    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        return next(); // Senha correta, segue para a documentação
    }

    // Função para gerar formulário HTML
    const gerarFormulario = (mensagem = "") => `
        <form method="post">
            ${mensagem ? `<p style="color: red;">${mensagem}</p>` : ""}
            <label for="senhaDigitada">Senha da documentação:</label>
            <input type="password" name="senhaDigitada" id="senhaDigitada" />
            <button type="submit">Entrar</button>
        </form>
    `;

    res.status(senhaDigitada ? 401 : 200).set('Content-Type', 'text/html');
    res.send(gerarFormulario(senhaDigitada ? "Acesso negado!" : ""));
}

module.exports = authDocProducao;
