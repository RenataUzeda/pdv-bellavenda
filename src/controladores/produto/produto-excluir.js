const knex = require("../../conexao");
const validarId = require("../../utils/validar-id");

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
        await validarId(id, "produtos");

        await knex("produtos").where({ id }).del();

        return res.status(200).json({ mensagem: 'Produto excluído!' });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }

}

module.exports = excluirProduto;