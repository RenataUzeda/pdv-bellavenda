const knex = require("../../conexao");

const detalharProduto = async (req, res) => {
    try {
        const { id } = req.params;
        //chamar a função de validar o id
        const produto = await knex('produtos').where({ id }).first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' });
        }

        return res.status(200).json(produto);

    } catch (error) {
        // passar no status o status.code
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = detalharProduto;