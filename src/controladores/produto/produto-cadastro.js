const knex = require('../../conexao');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }
        const categoriaExiste = await knex('categorias').where('id', categoria_id);
        console.log(categoriaExiste)

        if (categoriaExiste.length === 0) {
            return res.status(404).json({ mensagem: 'A categoria não existe.' });
        }

        const novoProduto = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        //await knex('produtos').insert(novoProduto);

        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarProduto;