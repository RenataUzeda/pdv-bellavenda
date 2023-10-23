const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const validarEmail = require('../../utils/validar-email');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await verificaCampoVazio({ nome, email, senha });

        await validarEmail(email, 'usuarios');

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            nome,
            email,
            senha: senhaCriptografada
        }

        await knex('usuarios').insert(novoUsuario);

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
};

module.exports = cadastrarUsuario;