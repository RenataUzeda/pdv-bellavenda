const verificaCamposEmailSenha = async (email, senha) => {

    if (!email) {
        throw { statusCode: 400, message: 'É obrigatório informar o campo email' };
    };

    if (!senha) {
        throw { statusCode: 400, message: 'É obrigatório informar o campo senha' };
    };
};

const verificaCampoNome = async (nome) => {

    if (!nome) {
        throw { statusCode: 400, message: "É obrigatório informar o campo nome" };
    };
};

module.exports = {
    verificaCamposEmailSenha,
    verificaCampoNome
};