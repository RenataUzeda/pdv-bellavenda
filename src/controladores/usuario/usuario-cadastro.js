const knex = require('../../conexao');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const { 
    verificaCampoNome, 
    verificaCamposEmailSenha 
} = require('../../utils/verificar-campos-vazios');
=======
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
>>>>>>> revisao
const validarEmail = require('../../utils/validar-email');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
<<<<<<< HEAD
        await verificaCampoNome(nome);
        await verificaCamposEmailSenha(email, senha);
        await validarEmail(email, 'usuarios');
=======
        await verificaCampoVazio({ nome, email, senha });

        await validarEmail(email);
>>>>>>> revisao

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