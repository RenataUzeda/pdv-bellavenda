const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const validarEmail = require('../../utils/validar-email');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        await verificaCampoVazio({ nome, email, senha });

        const usuarioId = req.usuario.id;

        await validarEmail(email, 'usuarios', usuarioId);

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios')
            .where('id', usuarioId)
            .update({
                nome,
                email,
                senha: senhaCriptografada
            });

        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message })
    };
};

module.exports = atualizarUsuario;
