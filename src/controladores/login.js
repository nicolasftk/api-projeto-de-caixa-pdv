const { senhaDescriptografada } = require('../utilis/criptografia')
const { gerarToken } = require('../utilis/token')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        if (!req.validarEmail) {
            return res
                .status(400)
                .json({ mensagem: 'Email ou senha invalida.' })
        }
        const senhaValida = await senhaDescriptografada(
            senha,
            req.validarEmail.senha
        )
        if (!senhaValida) {
            return res
                .status(401)
                .json({ mensagem: 'Email ou senha invalida.' })
        }
        const token = gerarToken(req.validarEmail.id, '1d')
        delete req.validarEmail.senha
        return res.json({ usuario: req.validarEmail, token })
    } catch (error) {
        return res.status(401).json({ mensagem: 'Erro na autenticação.' })
    }
}

module.exports = login
