const knex = require('../conexao');

async function validarCategoria(categoria_id) {

    if (!categoria_id) {
        throw { statusCode: 400, message: 'O campo Categoria_id é obrigatório.' };
    }

    const categoriaExiste = await knex('categorias').where('id', categoria_id);

    if (categoriaExiste.length === 0) {
        throw { statusCode: 404, message: 'A categoria não existe.' };
    }
}

module.exports = validarCategoria;