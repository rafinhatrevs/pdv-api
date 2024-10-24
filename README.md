### pdv-api
Desafio DDS Final - API PDV

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafinhatrevs/pdv-api">
  
  <a href="https://github.com/rafinhatrevs/pdv-api/commits/master/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafinhatrevs/pdv-api">
  </a>
  
  <a href="https://www.linkedin.com/in/rafaellatrevizan/">
    <img alt="Feito por Rafaella Trevizan" src="https://img.shields.io/badge/feito-por%20Rafaella%20Trevizan-D818A5">
  </a>

  <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/status-EM%20DESENVOLVIMENTO-green">
</p>   

# API PDV

Esta é uma API para um PDV (Frente de Caixa). O objetivo desta API é permitir que os usuários realizem operações relacionadas a cadastro, login, redefinição de senha, detalhamento e edição de perfil de usuários; 
cadastro, edição, listagem, detalhamento e exclusão de produtos; cadastro, edição, listagem e detalhamento de clientes; cadastro e listagem de pedidos; e, por fim, upload de imagens referente aos produtos.
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
  - **multer.js:** Configuração do middleware Multer para manipulação de uploads de arquivos.

  #### schemas/:
  - **schemaCliente.js:** Schema Joi para validação dos dados dos clientes.
  - **schemaLogin.js:** Schema Joi para validação dos dados de login dos usuários.
  - **schemaPedido.js:** Schema Joi para validação dos dados dos pedidos.
  - **schemaProduto.js:** Schema Joi para validação dos dados dos produtos.
  - **schemaSenhaNova.js:** Schema Joi para validação da nova senha dos usuários durante a redefinição.
  - **schemaUsuario.js:** Schema Joi para validação dos dados dos usuários.

  #### servicos/:
  - **conexao.js:** Arquivo de configuração da conexão com o banco de dados PostgreSQL utilizando knex.
  - **nodemailer.js:** Arquivo de configuração do serviço Nodemailer para envio de e-mails.
  - **storage.js:** Arquivo de configuração do serviço de armazenamento de arquivos.
  
  #### storage/:
  - **s3.js:** Arquivo que configura o cliente AWS S3 para armazenamento de arquivos na nuvem.

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

#### Exemplos de requisições (Body JSON)

```javascript

// POST /usuario
{
	"nome": "Usuario",
	"email": "usuario@example.com",
	"senha": "123456"
}

```
```javascript

// POST /login
{
	"email": "usuario@example.com",
	"senha": "123456"
}

```
```javascript

// PATCH /usuario/redefinir
{
	"email": "usuario@example.com",
	"senha_antiga": "123456",
	"senha_nova": "1234567"
}

```
```javascript

// PUT /usuario
{
	"nome": "Usuario",
	"email": "usuario@example.com",
	"senha": "123456"
}

```
```javascript

// POST /produto
{
	"descricao": "Pato de Borracha",
	"quantidade_estoque": 30,
	"valor": 200,
	"categoria_id": 4
}

```
```javascript

// PUT /produto/:id
{
	"descricao": "Pato de Borracha",
	"quantidade_estoque": 30,
	"valor": 200,
	"categoria_id": 4
}

```
```javascript

// POST /produto/:id/imagem
{
	"imagem": "imagem.png"
}

```
```javascript

// POST /cliente
{
	"nome": "Cliente",
	"email": "cliente@example.com",
	"cpf": "12345678910"
}

```
```javascript

// PUT /cliente/:id
{
	"nome": "Cliente",
	"email": "cliente@example.com",
	"cpf": "12345678910",
	"cep": "12345678",
	"rua": "Rua 1",
	"numero": 123,
	"bairro": "Centro",
	"cidade": "São Paulo",
	"estado": "SP"
}

```
```javascript

// POST /pedido
{
	"cliente_id": 1,
	"pedido_produtos": 
	[
		{
			"produto_id": 1,
			"quantidade_produto": 5
		}
	]
}

```

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 🛠 Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js utilizado para criar a API RESTful.
- **Nodemon:** Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor quando necessário.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional open-source.
- **npm:** Gerenciador de pacotes Node.js.
- **bcrypt:** Função de hashing criptográfico utilizada para armazenar senhas de forma segura em bancos de dados.
- **jsonwebtoken:** Implementação de tokens JWT (JSON Web Tokens) para autenticação segura entre partes.
- **knex.js:** Biblioteca SQL query builder para Node.js que facilita a construção de consultas e migrações de banco de dados.
- **dotenv:** Módulo para carregar variáveis de ambiente de um arquivo .env para process.env, ajudando na configuração segura de aplicações.
- **aws-sdk:** Biblioteca da AWS para integração com serviços como S3 para armazenamento de arquivos na nuvem.
- **joi:** Biblioteca de validação para JavaScript, usada para validar o corpo das requisições.
- **multer:** Middleware para gerenciamento de uploads de arquivos em aplicações Node.js.
- **nodemailer:** Biblioteca para envio de e-mails em Node.js.

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
