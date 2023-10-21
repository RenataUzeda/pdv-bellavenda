const knex = require('../../conexao');
const validarCategoria = require('../../utils/validar-categoria');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        await verificaCampoVazio({ descricao, quantidade_estoque, valor });

        await validarCategoria(categoria_id);

        const novoProduto = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        await knex('produtos').insert(novoProduto);

        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.' });
    } catch (error) {
        if (error.code === "23505" && error.constraint === "unique_descricao") {
            return res.status(400).json({ mensagem: 'Essa descrição já existe no cadastro de produtos.' });
        }
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarProduto;