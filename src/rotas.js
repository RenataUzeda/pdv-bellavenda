const express = require('express');
const cadastrarUsuario = require('./controladores/usuario-cadastro');

const rotas = express();

rotas.get('/categoria');

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login');
rotas.get('/usuario');
rotas.put('/usuario');

module.exports = rotas;