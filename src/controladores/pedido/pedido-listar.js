const knex = require('../../conexao');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    let pedidos;
    let pedidosFormatados = [];

    try {
        if (!cliente_id) {
            pedidos = await knex
                .select(
                    'pedidos.id',
                    'pedidos.valor_total',
                    'pedidos.observacao',
                    'pedidos.cliente_id'
                )
                .from('pedidos');

        } else {
            const clienteExistente = await knex('clientes').where({ id: cliente_id });

            if (clienteExistente.length === 0) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }

            pedidos = await knex
                .select(
                    'pedidos.id',
                    'pedidos.valor_total',
                    'pedidos.observacao',
                    'pedidos.cliente_id'
                )
                .from('pedidos')
                .where('pedidos.cliente_id', cliente_id);
        }

        for (const pedido of pedidos) {
            const pedidoProdutos = await knex
                .select(
                    'pedido_produtos.id',
                    'pedido_produtos.quantidade_produto',
                    'pedido_produtos.valor_produto',
                    'pedido_produtos.pedido_id',
                    'pedido_produtos.produto_id'
                )
                .from('pedido_produtos')
                .where('pedido_produtos.pedido_id', pedido.id);

            let pedidoFormatado = {
                pedido,
                pedido_produtos: pedidoProdutos
            };

            pedidosFormatados.push(pedidoFormatado);
        }
        return res.status(200).json(pedidosFormatados);

    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }

};

module.exports = listarPedidos;