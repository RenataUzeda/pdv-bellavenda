const knex = require('../conexao');

async function validarEmail(req, email) {

    const emailUnico = await knex('usuarios').where({ email });

    if (emailUnico.length > 0 && req.usuario.email != email) {
        throw { statusCode: 400, message: 'Endereço de e-mail já existe no sistema' };
    }
}

module.exports = validarEmail;
