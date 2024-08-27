### pdv-api
Desafio DDS Final - API PDV

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafinhatrevs/pdv-api">
  
  <a href="https://github.com/rafinhatrevs/pdv-api/commits/main/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafinhatrevs/pdv-api">
  </a>
  
  <a href="https://www.linkedin.com/in/rafaellatrevizan/">
    <img alt="Feito por Rafaella Trevizan" src="https://img.shields.io/badge/feito-por%20Rafaella%20Trevizan-D818A5">
  </a>

  <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/status-EM%20DESENVOLVIMENTO-green">
</p>   

# API PDV

Esta é uma API para um PDV (Frente de Caixa). O objetivo desta API é permitir que os usuários realizem operações relacionadas a cadastro, login, redefinição de senha, detalhamento e edição de perfil de usuários; 
cadastro, edição, listagem, detalhamento e exclução de produtos; cadastro, edição, listagem e detalhamento de clientes; cadastro e listagem de pedidos; e, por fim, upload de imagens referente aos produtos.
Projeto desenvolvido durante a turma 16 de Desenvolvimento de Software | Back-End oferecida pela Cubos Academy.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  💻 Estrutura do Projeto

- **example.env:** Arquivo que exemplifica variáveis de ambiente para armazenamento de dados sensíveis.

#### src/:
- **index.js:** Arquivo principal da aplicação que configura o servidor Express e as rotas.
- **rotas.js:** Arquivo que contém as definições das rotas da API.
  
#### controladores/:
- **categorias.js:** Controlador responsável por listar todas as categorias cadastradas.
- **clientes.js:** Controlador responsável por lidar com operações relacionadas aos clientes, como cadastrar, editar, listar e detalhar. 
- **login.js:** Controlador responsável pelo login de usuários.
- **pedidos.js:** Controlador responsável por lidar com operações relacionadas aos pedidos, como cadastrar e listar.
- **produtos.js:** Controlador responsável por lidar com operações relacionadas aos produtos, como cadastrar, editar, listar, detalhar, excluir e efetuar upload de imagem.
- **usuarios.js:** Controlador responsável por lidar com operações relacionadas aos usuários, como cadastrar, redefinir senha, detalhar e editar perfil. 
  
#### intermediarios/:
- **validacaoLogin.js:** Intermediário para autenticar o login do usuário antes de executar operações.
- **validacaoBody.js:** Intermediário para validação de preenchimento obrigatório de dados através de schemas Joi.
- **multer.js:**

#### schemas/:
- **schemaCliente.js:**
- **schemaLogin.js:**
- **schemaPedido.js:**
- **schemaProduto.js:**
- **schemaSenhaNova.js:**
- **schemaUsuario.js:**

#### servicos/:
- **conexao.js:** Arquivo de configuração da conexão com o banco de dados PostgreSQL utilizando knex.
- **nodemailer.js:**
- **storage.js:**

#### storage/:
- **s3.js:**

#### sql/: 
- **estrutura.sql:** Estrutura do banco de dados e suas tabelas.
- **categorias.sql:** Inserção de dados na tabela categorias.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⚙️ Funcionalidades

- **Listar Categorias:** `GET` `/categoria`   
  Endpoint para listar todas as categorias cadastradas.
  
- **Cadastrar Usuário:** `POST` `/usuario`   
  Endpoint para cadastrar um novo usuário.
- **Login:** `POST` `/login`  
  Endpoint para efetuar o login do usuário.
- **Redefinir Senha:** `PATCH` `/usuario/redefinir`  
  Endpoint para redefinir a senha de um usuário.
- **Detalhar Perfil:** `GET` `/usuario`   
  Endpoint para detalhar o perfil do usuário logado.
- **Editar Perfil:** `PUT` `/usuario`  
  Endpoint para editar o perfil do usuário logado.

- **Cadastrar Produto:** `POST` `/produto`  
  Endpoint para cadastrar um novo produto através do usuário logado.
- **Editar Produto:** `PUT` `/produto/:id`  
  Endpoint para editar um produto específico através do usuário logado.
- **Listar Produtos:** `GET` `/produto`  
  Endpoint para listar todos os produtos cadastrados ou filtrar os produtos por categoria, através do usuário logado.
- **Detalhar Produto:** `GET` `/produto/:id`  
  Endpoint para detalhar um produto específico através do usuário logado.
- **Excluir Produto:** `DELETE` `/produto/:id`  
  Endpoint para excluir um produto específico através do usuário logado.
- **Imagem Produto:** `PATCH` `/produto/:id/imagem`  
  Endpoint para efetuar o upload de imagem de um produto específico, podendo atualizar ou excluir uma imagem já existente, através do usuário logado.

- **Cadastrar Cliente:** `POST` `/cliente`  
  Endpoint para cadastrar um novo cliente através do usuário logado.
- **Editar Cliente:** `PUT` `/cliente/:id`  
  Endpoint para editar um cliente específico através do usuário logado.
- **Listar Clientes:** `GET` `/cliente`  
  Endpoint para listar todos os clientes cadastrados através do usuário logado.
- **Detalhar Cliente:** `GET` `/cliente/:id`  
  Endpoint para detalhar um cliente específico através do usuário logado.

- **Cadastrar Pedido:** `POST` `/pedido`  
  Endpoint para cadastrar um novo pedido através do usuário logado.
- **Listar Pedidos:** `GET` `/pedido`  
  Endpoint para listar todos os pedidos cadastrados ou filtrar os pedidos por cliente, através do usuário logado.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⭐ Como executar o projeto

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/)
3. [PostgreSQL](https://www.postgresql.org/)
   
**Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).**

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:rafinhatrevs/pdv-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd pdv-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

<p align="center">
  <a href="https://insomnia.rest/run/?label=&uri=https://raw.githubusercontent.com/rafinhatrevs/dindin-api-insomnia/main/Insomnia_2024-06-25.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

#### Exemplos de requisições (Body JSON)

```javascript


```

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 🛠 Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js utilizado para criar a API RESTful.
- **Nodemon:** Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor quando necessário.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional open-source.
- **bcrypt:** Função de hashing criptográfico utilizada para armazenar senhas de forma segura em bancos de dados.
- **jsonwebtoken:** Implementação de tokens JWT (JSON Web Tokens) para autenticação segura entre partes.
- **knex.js:** Biblioteca SQL query builder para Node.js que facilita a construção de consultas e migrações de banco de dados.
- **dotenv:** Módulo para carregar variáveis de ambiente de um arquivo .env para process.env, ajudando na configuração segura de aplicações.
- **aws-sdk:**
- **joi:**
- **multer:**
- **nodemailer:**

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`.
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`.
4. Envie as suas alterações: `git push origin my-feature`.
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  🔑 Licença

Este projeto é licenciado por [MIT](https://opensource.org/license/mit).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

**Feito com 💜 por Rafaella Trevizan [Entre em contato!](https://www.linkedin.com/in/rafaellatrevizan/)**
