const knex = require('../conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(404).json({ mensagem: 'Os campos email e senha são obrigatórios' })
    }
    try {
        const usuarioId = req.usuario.id;

        console.log(usuarioId);


        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios')
            .where('id', usuarioId)
            .update({
                nome: nome,
                email: email,
                senha: senhaCriptografada
            });

        return res.status(201).send({ message: "Usuário atualizado com sucesso" });

    } catch (error) {
        
        return res.status(200).json(error.message)
    }

}


module.exports = atualizarUsuario;
