const express = require('express');
const cadastrarUsuario = require('./controladores/usuario-cadastro');
const loginUsuario = require('./controladores/usuario-login');
const validarLogin = require('./intermediarios/validar-login');
const detalharUsuario = require('./controladores/usuario-detalhar');
const listarCategorias = require('./controladores/categoria-listar');
const atualizarUsuario = require('./controladores/usuario-atualizar');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario',atualizarUsuario);

module.exports = rotas;