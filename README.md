# Projeto Base para Backend com Swagger e JWT

Este projeto é um template para a criação de APIs no backend, incluindo documentação automatizada com Swagger e autenticação de usuário utilizando JWT.

## Tecnologias Utilizadas

- Node.js
- Express
- Swagger (Documentação da API)
- JSON Web Token (JWT) para autenticação
- Dotenv (para variáveis de ambiente)
- Cors
- Bcrypt (para hash de senhas)
- MongoDB e Mongoose

## Instalação e Configuração

### 1. Clonar o repositório:
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar dependências:
```sh
npm install
```

### 3. Configurar variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta
MONGO_URI=sua_conexao_mongodb
```

### 4. Executar o servidor:
```sh
npm start
```
O servidor rodará na porta definida no arquivo `.env` (padrão: 3000).

## Scripts Disponíveis

- **`npm start`**: Inicia o servidor.
- **`npm run autoDoc`**: Gera automaticamente a documentação Swagger.
- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com `nodemon` para monitoramento de alterações.

## Documentação da API

Após rodar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```
Lá você encontrará detalhes sobre todas as rotas e como utilizá-las.

## Rotas Principais

### 1. Autenticação
- **POST** `/auth/login` - Autentica um usuário e retorna um token JWT.
- **POST** `/auth/register` - Registra um novo usuário.

### 2. Usuários
- **GET** `/users` - Retorna a lista de usuários (rota protegida por autenticação JWT).

## Exemplo de Uso do JWT

Ao fazer login, você receberá um token JWT. Para acessar rotas protegidas, envie esse token no cabeçalho das requisições:
```sh
Authorization: Bearer seu_token_aqui
```

## Contribuição
Fique à vontade para contribuir! Envie PRs ou abra issues com sugestões.

## Licença
Este projeto é de livre uso e pode ser modificado conforme necessário.

