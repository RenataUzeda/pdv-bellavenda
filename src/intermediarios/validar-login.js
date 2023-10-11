
const knex = require('../conexao.js');
const jwt = require('jsonwebtoken');

const validarLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS);
        const usuarioEncontrado = await knex('usuarios').where({ id }).first()

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
        }

        const usuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        };

        req.usuario = usuario;

        next()

    } catch (error) {
        console.log(error) // apagar na revisao
        return res.status(401).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = validarLogin;

