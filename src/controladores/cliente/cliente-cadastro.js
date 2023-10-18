const knex = require('../../conexao');
const { verificaCampoNome } = require('../../utils/verificar-campos-vazios');
const validarCpf = require('../../utils/validar-cpf');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ mensagem: 'O campo email é obrigatório.' });
        }

        await verificaCampoNome(nome);
        await validarCpf(cpf);

        const emailUnicoCliente = await knex('clientes').where({ email });

        if (emailUnicoCliente.length > 0) {
            return res.status(400).json({ mensagem: 'Endereço de e-mail já existe no sistema.' });
        }

        const novoCliente = {
            nome,
            email,
            cpf
        }

        await knex('clientes').insert(novoCliente);

        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso.' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarCliente;