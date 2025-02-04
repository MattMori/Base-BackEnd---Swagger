const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/routes');
const authDocProducao = require('./src/middlewares/authDoc');
const conectarBancoDados = require('./src/middlewares/conectarBD');
require('dotenv').config();

const app = express();

//  Função para iniciar o servidor
async function startServer() {
    try {
        console.log(' Conectando ao banco de dados...');
        await conectarBancoDados();
        console.log(' Banco de dados conectado!');

        // Configuração de CORS mais segura
        const corsOptions = {
            origin: process.env.FRONTEND_URL || '*', // Se disponível, usa a URL do front-end
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        };
        app.use(cors(corsOptions));

        //  Middlewares essenciais
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());

        //  Swagger UI - Documentação da API
        if (process.env.NODE_ENV !== 'test') {
            const swaggerFile = require('./swagger/swagger_output.json');
            const swaggerOptions = { customCssUrl: '/swagger-ui.css' };

            app.get('/', (req, res) => res.redirect('/doc')); // Redireciona para Swagger
            app.use('/doc', authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
        }

        //  Servir arquivos estáticos APÓS configurar o Swagger
        app.use(express.static(path.join(__dirname, 'public')));

        // Configuração das rotas
        if (typeof routes === 'function') {
            routes(app);
        } else {
            console.error(' Erro: O arquivo de rotas não exporta uma função válida.');
            process.exit(1);
        }

        // Inicia o servidor apenas se não estiver rodando testes
        if (process.env.NODE_ENV !== 'test') {
            const PORT = process.env.PORT || 4000;
            app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
        }
    } catch (error) {
        console.error(' Erro ao iniciar o servidor:', error.message);
        process.exit(1); // Encerra a aplicação se houver erro crítico
    }
}

// 🏁 Inicia a aplicação
startServer();

module.exports = app;
