const express = require('express');
const cadastrarUsuario = require('./controladores/usuario-cadastro');
const loginUsuario = require('./controladores/usuario-login');
const validarLogin = require('./intermediarios/validar-login');
const atualizarUsuario = require('./controladores/usuario-atualizar');

const rotas = express();

rotas.get('/categoria');

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validarLogin);

rotas.get('/usuario');
rotas.put('/usuario',atualizarUsuario);

module.exports = rotas;