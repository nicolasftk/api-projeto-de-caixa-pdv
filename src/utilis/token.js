const jwt = require('jsonwebtoken')

const gerarToken = (dados, expiracao) => {
    const token = jwt.sign({ id: dados }, process.env.SENHA_JWT, {
        expiresIn: expiracao,
    })
    return token
}

const verificarToken = async (token) => {
    const { id } = await jwt.verify(token, process.env.SENHA_JWT)
    return id
}

module.exports = {
    gerarToken,
    verificarToken,
}
