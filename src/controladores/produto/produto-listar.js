const knex = require('../../conexao');

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        let produtos;

        if (categoria_id) {
            produtos = await knex("produtos").leftJoin("categorias", "produtos.categoria_id", "categorias.id").where({ categoria_id }).orderBy("produtos.id", "asc").select(
                "produtos.id as id",
                "produtos.descricao as descricao",
                "produtos.quantidade_estoque",
                "produtos.valor",
                "categorias.id as categoria_id",
                "categorias.descricao as categoria_descricao"
            );
        } else {
            produtos = await knex("produtos").orderBy("id", "asc");
        }

        if (produtos.length === 0) throw { statusCode: 404, message: "Nenhum produto encontrado." };

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
};

module.exports = listarProdutos;