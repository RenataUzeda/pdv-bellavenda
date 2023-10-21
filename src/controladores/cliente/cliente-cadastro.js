const knex = require('../../conexao');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const validarCpf = require('../../utils/validar-cpf');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await verificaCampoVazio({ nome, email });

<<<<<<< HEAD
        await verificaCampoNome(nome);
        await validarCpf(cpf, 'clientes');

=======
        await validarCpf(cpf);
        //chamar a função de validar email
>>>>>>> revisao
        const emailUnicoCliente = await knex('clientes').where({ email });

        if (emailUnicoCliente.length > 0) {
            return res.status(400).json({ mensagem: 'Endereço de e-mail já existe no sistema.' });
        }

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