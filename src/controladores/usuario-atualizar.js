const knex = require('../conexao');
const bcrypt = require('bcrypt');
const validarEmail = require('../utils/validar-email');

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(404).json({ mensagem: 'Os campos nome, email e senha são obrigatórios' })
    }
    try {
        const usuarioId = req.usuario.id;

        const emailError = await validarEmail(req, email);

        if (emailError) {
            return res.status(400).json({ mensagem: emailError.message });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios')
            .where('id', usuarioId)
            .update({
                nome: nome,
                email: email,
                senha: senhaCriptografada
            })

        return res.status(200).send({ message: "Usuário atualizado com sucesso" });

    } catch (error) {

        return res.status(200).json({ mensagem: error.message })
    }
}


module.exports = atualizarUsuario;
