const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(404).json({ mensagem: 'Os campos email e senha são obrigatórios' })
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' })

        const { senha: _, ...dadosUsuario } = usuario

        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        })
    } catch (error) {
        console.log(error) //apagar na revisao 
        return res.status(400).json(error.message)
    }
}


module.exports = loginUsuario;