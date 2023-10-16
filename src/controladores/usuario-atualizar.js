const knex = require('../conexao');
const bcrypt = require('bcrypt');
const validarEmail = require('../utils/validar-email');
const { verificaCampoNome, verificaCamposEmailSenha } = require('../utils/verificar-campos-vazios');

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        await verificaCampoNome(nome);
        await verificaCamposEmailSenha(email, senha);

        const usuarioId = req.usuario.id;

        const emailError = await validarEmail(req, email);

        if (emailError) {
            return res.status(400).json({ mensagem: emailError.message });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios')
            .where('id', usuarioId)
            .update({
                nome,
                email,
                senha: senhaCriptografada
            });

        return res.status(201).send({ mensagem: "Usuário atualizado com sucesso" });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message })
    }
}

module.exports = atualizarUsuario;
