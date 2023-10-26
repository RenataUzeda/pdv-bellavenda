const knex = require('../../conexao');
const { path } = require('../../rotas');
const validarCategoria = require('../../utils/validar-categoria');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const uploadImagem = require('./produto-imagem');



const cadastrarProduto = async (req, res) => {

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { originalname, mimetype, buffer } = req.file

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

        const id = produto[0].id

        const produto_imagem = await uploadImagem(
            `produtos /${produto[0].id}/${originalname}`,
            buffer,
            mimetype
        )

        produto = await knex('produtos').update({
            produto_imagem: produto_imagem.path
        }).where({ id})

        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.' });
    } catch (error) {
        if (error.code === "23505" && error.constraint === "unique_descricao") {
            return res.status(400).json({ mensagem: 'Essa descrição já existe no cadastro de produtos.' });
        }
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarProduto;