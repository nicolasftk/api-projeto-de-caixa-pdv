const knex = require('../bancoDeDados/conexão')
const { verificarToken } = require('../utilis/token')

const autenticarRota = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado.' })
    }
    const token = authorization.split(' ')[1]
    try {
        const checarToken = await verificarToken(token)
        const usuario = await knex('usuarios').where({ id: checarToken })

        if (usuario.length < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }

        req.usuario = usuario[0]

        next()
    } catch (error) {
        return res.status(401).json({
            mensagem:
                'Para acessar este recurso um token de autenticação válido deve ser enviado.',
        })
    }
}

module.exports = {
    autenticarRota,
}
