function routes(app) {
    app.use('/exemploUser', require('./routes/exemploUser'));

    return;
}

module.exports = routes;
