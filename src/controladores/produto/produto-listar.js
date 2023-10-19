const knex = require('../../conexao');

const listarProdutos = async (req, res) => {
    try {
        const produtos = await knex("produtos").orderBy("id", "asc");
    
        if (produtos.length === 0) {
          throw { statusCode: 404, message: "Nenhum produto encontrado." };
        }
    
        return res.status(200).json(produtos);
      } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
      }
};

const filtrarProdutos = async (req, res) => {
    const { categoria_id } = req.params;
};

module.exports = {
    listarProdutos,
    filtrarProdutos
}