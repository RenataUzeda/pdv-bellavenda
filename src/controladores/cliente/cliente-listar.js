const knex = require("../../conexao");

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex("clientes").orderBy("id", "asc");

        if (clientes.length === 0) {
            throw { statusCode: 404, mensagem: "Nenhum cliente encontrado." };
        }
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }

}

module.exports = listarClientes;