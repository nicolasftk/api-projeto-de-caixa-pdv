const knex = require('../bancoDeDados/conexão')
const { senhaCriptografada } = require('../utilis/criptografia')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        if (req.validarEmail) {
            return res.status(400).json({
                mensagem:
                    'Já existe usuário cadastrado com o e-mail informado.',
            })
        }
        const senhaHash = await senhaCriptografada(senha)
        const novoUsuario = {
            nome,
            email,
            senha: senhaHash,
        }
        const cadastrarUsuario = await knex('usuarios')
            .insert(novoUsuario)
            .returning('*')

        if (cadastrarUsuario.length === 0) {
            return res.status(400).json('O usuário não foi cadastrado.')
        }
        delete cadastrarUsuario[0].senha
        return res.status(201).json(cadastrarUsuario[0])
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const detalharUsuario = async (req, res) => {
    const detalhesUsuario = req.usuario
    const { id, nome, email } = detalhesUsuario

    res.status(200).json({
        id,
        nome,
        email,
    })
}

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario
    const { nome, email, senha } = req.body

    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste && emailExiste.id !== Number(id)) {
            return res.status(400).json({
                mensagem: 'O e-mail informado já está sendo utilizado.',
            })
        }

        const senhaHash = await senhaCriptografada(senha)
        const usuarioAtualizado = await knex('usuarios')
            .update({ nome, email, senha: senhaHash })
            .where({ id })

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario,
}
