const knex = require("../../conexao");
const validarExcluirProduto = require("../../utils/validar-excluir-produto");
const validarId = require("../../utils/validar-id");
const { excluirImagem } = require('./produto-imagem');

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
        await validarId(id, "produtos");
        
        await validarExcluirProduto(id);
        
        const produto = await knex("produtos").select('produto_imagem').where({ id }).first();
        const imagemPath = produto ? produto.produto_imagem : null;

        if (imagemPath) {
            await excluirImagem(imagemPath);
        }

        await knex("produtos").where({ id }).del();
                
        return res.status(200).json({ mensagem: 'Produto excluído!' });

    } catch (error) {
        
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }

}

module.exports = excluirProduto;