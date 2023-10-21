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
        }

        if (cep) novoCliente.cep = cep;
        if (rua) novoCliente.rua = rua;
        if (numero) novoCliente.numero = numero;
        if (bairro) novoCliente.bairro = bairro;
        if (cidade) novoCliente.cidade = cidade;
        if (estado) novoCliente.estado = estado;

        await knex('clientes').insert(novoCliente);

        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso.' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarCliente;