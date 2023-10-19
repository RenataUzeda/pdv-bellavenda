const knex = require('../../conexao');
const validarCpf = require('../../utils/validar-cpf');
const validarEmail = require('../../utils/validar-email');
const validarId = require('../../utils/validar-id');
const { verificaCampoNome, verificaCampoCPF, verificaCamposEmailSenha } = require("../../utils/verificar-campos-vazios");

const atualizarDadosCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        await validarId(id, 'clientes');

        await verificaCampoNome(nome);
        await verificaCampoCPF(cpf);
        await verificaCamposEmailSenha(email);

        await validarEmail(email, id, 'clientes');
        await validarCpf(cpf, id, 'clientes');

        await knex('clientes')
            .where({ id })
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            });

        return res.status(200).send({ mensagem: "Cliente atualizado com sucesso" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    };
};

module.exports = atualizarDadosCliente;
