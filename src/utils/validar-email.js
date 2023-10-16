const knex = require('../conexao');

async function validarEmail(req, email) {

    const emailUnico = await knex('usuarios').where({ email });

    if (emailUnico.length > 0 && req.usuario.email != email) {
        throw { message: 'Endereço de e-mail já existe no sistema' };
    }

    return null;

}

module.exports = validarEmail;
