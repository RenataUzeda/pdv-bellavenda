const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body

    try {
        await verificaCampoVazio({ email, senha });

        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' });

        const dadosUsuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        };

        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = loginUsuario;