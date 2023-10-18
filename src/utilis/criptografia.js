const bcrypt = require('bcrypt')

const senhaCriptografada = async (senha, salt = 10) => {
    return await bcrypt.hash(senha, salt)
}

const senhaDescriptografada = async (senha, senhaBanco) => {
    const senhaValida = await bcrypt.compare(senha, senhaBanco)
    return senhaValida
}

module.exports = {
    senhaCriptografada,
    senhaDescriptografada,
}
