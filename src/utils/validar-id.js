const knex = require('../conexao');

const validarId = async (id, tabela) => {

    const verificaIdExistente = await knex(tabela).where({ id });

    if (verificaIdExistente.length === 0) {
        throw { statusCode: 404, message: 'Esse id não existe no sistema' };
    };
};

module.exports = validarId;