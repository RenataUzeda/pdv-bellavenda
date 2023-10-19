const verificaCamposEmailSenha = async (email, senha) => {

    if (!email) {
        throw { statusCode: 400, message: 'É obrigatório informar o campo email' };
    };
    if (senha) {
        if (!senha) {
            throw { statusCode: 400, message: 'É obrigatório informar o campo senha' };
        };
    };
};

const verificaCampoNome = async (nome) => {

    if (!nome) {
        throw { statusCode: 400, message: "É obrigatório informar o campo nome" };
    };
};

const verificaCampoCPF = async (cpf) => {

    if (!cpf) {
        throw { statusCode: 400, message: "É obrigatório informar o campo cpf" };
    };
};

module.exports = {
    verificaCamposEmailSenha,
    verificaCampoNome,
    verificaCampoCPF
};