const knex = require('../conexao');

async function calcularValorTotal(pedido_produtos) {
    let valorTotal = 0;
    for (const pedido_produto of pedido_produtos) {
        const { produto_id, quantidade_produto } = pedido_produto;
        const produto = await knex('produtos').where({ id: produto_id });
        const { valor } = produto[0];
        valorTotal += valor * quantidade_produto;
    }
    return valorTotal;
}

module.exports = calcularValorTotal;