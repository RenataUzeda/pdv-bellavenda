const verificaCampoVazio = async (campos) => {
    for (let campo in campos) {
        if (!campos[campo]) {
            throw { statusCode: 400, message: `O campo ${campo} deve ser informado` };
        }
    }
};

module.exports = {
    verificaCampoVazio
};