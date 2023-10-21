const knex = require('../conexao');

const validarCpf = async (cpf, tabela, id) => {

    const cpfUnico = await knex(tabela).where({ cpf });

    if (id) {
        if (cpfUnico.length > 0 && cpfUnico[0].id != id) {
            throw { statusCode: 400, message: 'O CPF já existe no sistema.' };
        }
    } else {
        if (cpfUnico.length > 0) {
            throw { statusCode: 400, message: 'O CPF já existe no sistema.' };
        }
    };
};

module.exports = validarCpf;