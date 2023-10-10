const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) return res.status(400).json({mensagem: 'É obrigatório informar os campos nome, email e senha'});

    try {
        const emailUnico = await knex('usuarios').where('email', '=', email);

        if (emailUnico.length > 0) return res.status(400).json({mensagem: 'Endereço de e-mail já existe no sistema'});

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            nome,
            email,
            senha: senhaCriptografada
        }

        await knex('usuarios').insert(novoUsuario);

        return res.status(201).json({mensagem: 'Usuário cadastrado com sucesso'});
    } catch (error) {
        return res.status(500).json({mensagem: error.message});
    }
};

module.exports = cadastrarUsuario;