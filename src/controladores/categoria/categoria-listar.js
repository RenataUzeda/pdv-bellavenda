const knex = require("../../conexao");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias").orderBy("id", "asc");

    if (categorias.length === 0) {
      throw { statusCode: 404, mensagem: "Nenhuma categoria encontrada." };
    }

    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ mensagem: error.message });
  }
};

module.exports = listarCategorias;
