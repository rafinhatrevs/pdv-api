const express = require('express');

const multer = require('./intermediarios/multer');
const validarLogin = require('./intermediarios/validacaoLogin');
const validarBody = require('./intermediarios/validacaoBody');

const schemaUsuario = require('./schemas/schemaUsuario');
const schemaLogin = require('./schemas/schemaLogin');
const schemaSenhaNova = require('./schemas/schemaSenhaNova');
const schemaProduto = require('./schemas/schemaProduto');
const schemaCliente = require('./schemas/schemaCliente');
const schemaPedido = require('./schemas/schemaPedido');

const categorias = require('./controladores/categorias');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');
const clientes = require('./controladores/clientes');
const pedidos = require('./controladores/pedidos');

const rotas = express();

rotas.get('/categoria', categorias.listarCategorias);

rotas.post('/usuario', validarBody(schemaUsuario), usuarios.cadastrarUsuario);
rotas.post('/login', validarBody(schemaLogin), login.login);
rotas.patch('/usuario/redefinir', validarBody(schemaSenhaNova), usuarios.redefinirSenha);

rotas.use(validarLogin);

rotas.get('/usuario', usuarios.detalharPerfil);
rotas.put('/usuario', validarBody(schemaUsuario), usuarios.editarPerfil);

rotas.post('/produto', validarBody(schemaProduto), produtos.cadastrarProduto);
rotas.put('/produto/:id', validarBody(schemaProduto), produtos.editarProduto);
rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', produtos.detalharProduto);
rotas.delete('/produto/:id', produtos.excluirProduto);
rotas.patch('/produto/:id/imagem', multer.single('imagem'), produtos.imagemProduto);

rotas.post('/cliente', validarBody(schemaCliente), clientes.cadastrarCliente);
rotas.put('/cliente/:id', validarBody(schemaCliente), clientes.editarCliente);
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharCliente);

rotas.post('/pedido', validarBody(schemaPedido), pedidos.cadastrarPedido);
rotas.get('/pedido', pedidos.listarPedidos);

module.exports = rotas;