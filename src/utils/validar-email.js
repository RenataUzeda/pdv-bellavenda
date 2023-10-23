const knex = require('../conexao');

const validarEmail = async (email, tabela, id) => {

    const emailUnico = await knex(tabela).where({ email });

    if (id) {
        if (emailUnico.length > 0 && emailUnico[0].id != id) {
            throw { statusCode: 400, message: 'Endereço de e-mail já existe no sistema' };
        }
    } else {
        if (emailUnico.length > 0) {
            throw { statusCode: 400, message: 'Endereço de e-mail já existe no sistema' };
        }
    };
};

module.exports = validarEmail;