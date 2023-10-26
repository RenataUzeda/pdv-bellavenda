const knex = require('../../conexao');
const validarCategoria = require('../../utils/validar-categoria');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const { uploadImagem } = require('./produto-imagem');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { originalname, mimetype, buffer } = req.file
 
    try {
        await verificaCampoVazio({ descricao, quantidade_estoque, valor });

        await validarCategoria(categoria_id);

        const [novoProduto] = await knex('produtos') .insert( {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        })
        .returning(['id']);
        
        const id = novoProduto.id;

        const imagem = await uploadImagem(
            `produtos/${id}/${originalname}`,
            buffer,
            mimetype
        )

        const [produtoComFoto] = await knex('produtos').update({
            produto_imagem: imagem.path
        }).where({ id }).returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem'])

        produtoComFoto.produto_imagem = imagem.url

        return res.status(201).json(produtoComFoto);
    } catch (error) {
        if (error.code === "23505" && error.constraint === "unique_descricao") {
            return res.status(400).json({ mensagem: 'Essa descrição já existe no cadastro de produtos.' });
        }
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarProduto;