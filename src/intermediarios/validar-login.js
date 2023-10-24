
const knex = require('../conexao.js');
const jwt = require('jsonwebtoken');

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        //const token = req.headers.authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        const usuarioEncontrado = await knex('usuarios').where({ id }).first();

        if (!usuarioEncontrado) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

        const usuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        };

        req.usuario = usuario;

        next();

    } catch (error) {
        if (error.message === 'jwt expired' || error.message === 'jwt must be provided') return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = validarLogin;

