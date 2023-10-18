const knex = require('../conexao');

async function validarCpf(cpf) {

    if (!cpf) {
        throw { statusCode: 400, message: 'O campo CPF é obrigatório.' };
    }

    const cpfUnico = await knex('clientes').where({ cpf });

    if (cpfUnico.length > 0) {
        throw { statusCode: 400, message: 'O CPF já existe no sistema.' };
    }
}


module.exports = validarCpf;