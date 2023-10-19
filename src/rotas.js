const express = require('express');
const cadastrarUsuario = require('./controladores/usuario/usuario-cadastro');
const loginUsuario = require('./controladores/usuario/usuario-login');
const validarLogin = require('./intermediarios/validar-login');
const detalharUsuario = require('./controladores/usuario/usuario-detalhar');
const listarCategorias = require('./controladores/categoria/categoria-listar');
const atualizarUsuario = require('./controladores/usuario/usuario-atualizar');
const cadastrarProduto = require('./controladores/produto/produto-cadastro');
const cadastrarCliente = require('./controladores/cliente/cliente-cadastro');
const listarProdutos = require('./controladores/produto/produto-listar');
const atualizarDadosProduto = require('./controladores/produto/produto-atualizar');
const atualizarDadosCliente = require('./controladores/cliente/cliente-atualizar');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.post('/produto', cadastrarProduto);
rotas.post('/cliente', cadastrarCliente);

rotas.get('/produto', listarProdutos);
rotas.put('/produto/:id', atualizarDadosProduto);
rotas.put('/cliente/:id', atualizarDadosCliente);

module.exports = rotas;