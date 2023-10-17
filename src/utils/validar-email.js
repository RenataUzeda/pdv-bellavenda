const knex = require('../conexao');

async function validarEmail(email, usuarioId) {

    const emailUnico = await knex('usuarios').where({ email });

    if (usuarioId) {
        if (emailUnico.length > 0 && emailUnico[0].id != usuarioId) {
            throw { statusCode: 400, message: 'Endereço de e-mail já existe no sistema' };
        }
    } else {
        if (emailUnico.length > 0) {
            throw { statusCode: 400, message: 'Endereço de e-mail já existe no sistema' };
        }
    }
}

module.exports = validarEmail;