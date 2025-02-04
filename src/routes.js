function routes(app) {
    app.use('/Exemplo', require('./routes/Exemplo'));

    return;
}

module.exports = routes;
