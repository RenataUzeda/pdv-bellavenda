const knex = require('../../conexao');
const validarCategoria = require('../../utils/validar-categoria');
const { verificaCampoVazio } = require('../../utils/verificar-campos-vazios');
const { uploadImagem } = require('./produto-imagem');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    
    try {
        await verificaCampoVazio({ descricao, quantidade_estoque, valor });
        
        await validarCategoria(categoria_id);

        if (quantidade_estoque < 0 || valor <= 0) {
            throw { statusCode: 400, message: 'quantidade_estoque e valor não podem ser negativos.' };
        };
        
        let imagem;

        if(req.file){
            const { originalname, mimetype, buffer } = req.file;
            const [novoProduto] = await knex('produtos').insert( {
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            }).returning(['*']);

            const id = novoProduto.id;

            imagem = await uploadImagem(`produtos/${id}/${originalname}`, buffer, mimetype)
            await knex('produtos').update({produto_imagem: imagem.url}).where({ id });
        } else {
            await knex('produtos').insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
        }).returning(['*'])
        }
        const [produtoComFoto] = await knex('produtos').where({ descricao }).select(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

        if (imagem) {
            produtoComFoto.produto_imagem = imagem.url;
        } else {
            delete produtoComFoto.produto_imagem;
        }

        return res.status(201).json(produtoComFoto);
    
    } catch (error) {
        if (error.code === "23505" && error.constraint === "unique_descricao") {
            return res.status(400).json({ mensagem: 'Essa descrição já existe no cadastro de produtos.' });
        }
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}

module.exports = cadastrarProduto;