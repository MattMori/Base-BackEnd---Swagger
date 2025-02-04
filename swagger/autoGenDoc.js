const mongooseToSwagger = require('mongoose-to-swagger');
// Importar os esquemas nesta região
const EsquemaExemploUser = require('../src/models/exemploUser.js');

const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

let outputFile = './swagger_output.json';
let endpointsFiles = ['../index.js', '../src/routes.js'];


if (String(process.env.OS).toLocaleLowerCase().includes("windows")) {
    outputFile = './swagger/swagger_output.json';
    endpointsFiles = ['./index.js', './src/routes.js'];
}


let doc = {
    info: {
        version: "1.0.0",
        title: " titulo da API",
        description: " Descrição da Api."
    },
    servers: [
        {
            url: "http://localhost:4000/",
            description: "Servidor localhost."
        },
        {
            url: " url do servidor de produção",
            description: "Servidor de produção."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            // esquemas aqui: exemplo: 
            ExemploUser: mongooseToSwagger(EsquemaExemploUser),

        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
    if (process.env.NODE_ENV !== 'production') {
        require("../index.js");
    }
})
