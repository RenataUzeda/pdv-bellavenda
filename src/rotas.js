const express = require('express');
const cadastrarUsuario = require('./controladores/usuario-cadastro');
const loginUsuario = require('./controladores/usuario-login');
const validarLogin = require('./intermediarios/validar-login');
const detalharUsuario = require('./controladores/usuario-detalhar');

const rotas = express();

rotas.get('/categoria');

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario');

module.exports = rotas;