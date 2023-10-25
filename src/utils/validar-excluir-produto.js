const knex = require('../conexao');

const validarExcluirProduto = async (id) => {
    const pedidos = await knex("pedido_produtos").where({"produto_id": id});

    if (pedidos.length > 0) throw { statusCode: 403, message: 'A ação não pode ser concluída. O produto que você está tentando excluir está relacionado a um ou mais pedidos existentes no sistema.' };
};

module.exports = validarExcluirProduto;