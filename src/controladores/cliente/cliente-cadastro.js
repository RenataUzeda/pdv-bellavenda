const knex = require('../../conexao');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const validarCpf = require('../../utils/validar-cpf');
const validarEmail = require('../../utils/validar-email');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await verificaCampoVazio({ nome, email, cpf });
        await validarCpf(cpf, 'clientes');
        await validarEmail(email, 'clientes');

        const novoCliente = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }

        await knex('clientes').insert(novoCliente);

        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso.' });
    } catch (error) {
        if (error.message.includes("invalid input syntax for integer")) {
            return res.status(400).json({ mensagem: "Certifique-se de fornecer números para os campos cep e numero." });
        }
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarCliente;