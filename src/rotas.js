const express = require('express');
const multer = require('./multer');
const cadastrarUsuario = require('./controladores/usuario/usuario-cadastro');
const loginUsuario = require('./controladores/usuario/usuario-login');
const validarLogin = require('./intermediarios/validar-login');
const detalharUsuario = require('./controladores/usuario/usuario-detalhar');
const listarCategorias = require('./controladores/categoria/categoria-listar');
const atualizarUsuario = require('./controladores/usuario/usuario-atualizar');
const cadastrarProduto = require('./controladores/produto/produto-cadastro');
const cadastrarCliente = require('./controladores/cliente/cliente-cadastro');
const detalharProduto = require('./controladores/produto/produto-detalhar');
const listarProdutos = require('./controladores/produto/produto-listar');
const atualizarDadosProduto = require('./controladores/produto/produto-atualizar');
const atualizarDadosCliente = require('./controladores/cliente/cliente-atualizar');
const detalharCliente = require('./controladores/cliente/cliente-detalhar');
const listarClientes = require('./controladores/cliente/cliente-listar');
const excluirProduto = require('./controladores/produto/produto-excluir');
const cadastrarPedido = require('./controladores/pedido/pedido-cadastro');
const listarPedidos = require('./controladores/pedido/pedido-listar');



const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.post('/produto', multer.single('produto_imagem'), cadastrarProduto);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', cadastrarCliente);
rotas.get('/cliente/:id', detalharCliente);
rotas.get('/cliente', listarClientes);

rotas.get('/produto', listarProdutos);
rotas.put('/produto/:id', multer.single('produto_imagem'), atualizarDadosProduto);
rotas.put('/cliente/:id', atualizarDadosCliente);

rotas.post('/pedido', cadastrarPedido);
rotas.get('/pedido', listarPedidos);

module.exports = rotas;