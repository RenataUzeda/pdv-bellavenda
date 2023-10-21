const knex = require("../../conexao");
const validarId = require("../../utils/validar-id");

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
        await validarId(id, "produtos");

        await knex("produtos").where({ id }).del();
        //código de status 204 para no content, verificar se mantém ou retorna o 200 que traz a mensagem no insominia.
        return res.status(200).send({ mensagem: 'Produto excluído!' });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }

}

module.exports = excluirProduto;