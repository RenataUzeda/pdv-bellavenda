const knex = require("../../conexao");
const validarCategoria = require("../../utils/validar-categoria");
const validarId = require("../../utils/validar-id");
const { verificaCampoVazio } = require("../../utils/verificar-campos-vazios");

const atualizarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  try {
    await verificaCampoVazio({ descricao, quantidade_estoque, valor, categoria_id });

    await validarId(id, "produtos");

    await validarCategoria(categoria_id);

    await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(200).send({ mensagem: "Produto atualizado com sucesso" });
  } catch (error) {
    if (error.code === "23505" && error.constraint === "unique_descricao") {
      return res.status(400).json({
        mensagem: "Essa descrição já existe no cadastro de produtos."
      });
    }
    return res
      .status(error.statusCode || 500)
      .json({ mensagem: error.message });
  }
};

module.exports = atualizarDadosProduto;
