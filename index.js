const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = { customCssUrl: '/swagger-ui.css' }; // Usando CSS local ou um link
const routes = require('./src/routes');
const authDocProducao = require('./src/middlewares/authDoc');
const app = express();
require('dotenv').config();

// Configuração de CORS
const corsOptions = {
    origin: '*', // Ou use a URL do seu front-end em produção
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Aplica a configuração CORS

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI - Documentação da API
if (process.env.NODE_ENV !== 'test') {
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res) => { /* #swagger.ignore = true */ res.redirect('/doc'); });
    app.use('/doc', authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
}

// Rotas
routes(app);

// Inicia o servidor
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
