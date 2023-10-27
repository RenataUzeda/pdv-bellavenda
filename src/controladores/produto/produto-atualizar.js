const knex = require("../../conexao");
const validarCategoria = require("../../utils/validar-categoria");
const validarId = require("../../utils/validar-id");
const { verificaCampoVazio } = require("../../utils/verificar-campos-vazios");
const { uploadImagem } = require("./produto-imagem");

const atualizarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  try {
    await verificaCampoVazio({ descricao, quantidade_estoque, valor, categoria_id });

    await validarId(id, "produtos");

    await validarCategoria(categoria_id);

    if (quantidade_estoque < 0 || valor <= 0) {
            throw { statusCode: 400, message: 'quantidade_estoque e valor não podem ser negativos.' };
        };

    let imagem;

    if(req.file){
      const { originalname, mimetype, buffer } = req.file;
      
      await knex('produtos').where({id}).update( {
          descricao,
          quantidade_estoque,
          valor,
          categoria_id
      });

      imagem = await uploadImagem(`produtos/${id}/${originalname}`, buffer, mimetype)
      await knex('produtos').where({id}).update({produto_imagem: imagem.url});
  } else {
      await knex('produtos').where({id}).update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id
  })
  }
  const [produtoComFoto] = await knex('produtos').where({ descricao }).select(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

  if (imagem) {
      produtoComFoto.produto_imagem = imagem.url;
  } else {
      delete produtoComFoto.produto_imagem;
  }

  return res.status(201).json(produtoComFoto);

  } catch (error) {
    if (error.code === "23505" && error.constraint === 'unique_descricao') {
      return res.status(400).json({
        mensagem: 'Essa descrição já existe no cadastro de produtos.'
      });
    };
    return res.status(error.statusCode || 500).json({ mensagem: error.message });
  };
};

module.exports = atualizarDadosProduto;
