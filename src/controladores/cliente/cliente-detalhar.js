const knex = require("../../conexao");

const detalharCliente = async (req, res) => {
    try {
        const { id } = req.params;
        //chamar a funçao de validar id
        const cliente = await knex('clientes').where({ id }).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        }

        return res.status(200).json(cliente);

    } catch (error) {
        //passar no status o status.code
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = detalharCliente;