const knex = require('../../conexao');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const calcularValorTotal = require('../../utils/calcular-valor-total');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        await verificaCampoVazio({ cliente_id, pedido_produtos });

        const { produto_id, quantidade_produto } = pedido_produtos[0];

        await verificaCampoVazio({ produto_id, quantidade_produto });

        const clienteExistente = await knex('clientes').where({ id: cliente_id });

        if (clienteExistente.length === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        for (const pedido_produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = pedido_produto;

            const produtoExistente = await knex('produtos').where({ id: produto_id });

            if (produtoExistente.length === 0) {
                return res.status(404).json({ mensagem: `Produto com ID ${produto_id} não encontrado` });
            }

            const { quantidade_estoque } = produtoExistente[0];

            if (quantidade_estoque < quantidade_produto) {
                return res.status(400).json({ mensagem: `Quantidade insuficiente em estoque para o produto com ID ${produto_id}` });
            }
        }

        const novoPedido = {
            cliente_id,
            observacao,
            valor_total: await calcularValorTotal(pedido_produtos)
        }

        const pedido_id = await knex('pedidos').insert(novoPedido).returning('id');

        for (const pedido_produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = pedido_produto;
            const produto = await knex('produtos').where({ id: produto_id });
            const { valor } = produto[0];

            const novoProdutoPedido = {
                pedido_id: pedido_id[0].id,
                produto_id,
                quantidade_produto,
                valor_produto: valor // multiplica pela qtdd aqui tbm?
            }

            await knex('pedido_produtos').insert(novoProdutoPedido);
        }

        return res.status(201).json({ message: 'Pedido cadastrado com sucesso' });
    } catch (error) {
        console.error(error); // apagar na revisao
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
};

module.exports = cadastrarPedido;