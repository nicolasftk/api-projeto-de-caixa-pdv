const knex = require('../bancoDeDados/conexão')

const schemaCorpo = (joiSchema) => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
const validarEmail = async (req, res, next) => {
    const { email } = req.body
    const encontrarUsuario = await knex('usuarios')
        .where({ email })
        .returning('*')
    req.validarEmail =
        encontrarUsuario.length === 0 ? null : encontrarUsuario[0]
    next()
}

const validarEmailCliente = async (req, res, next) => {
    const { email } = req.body
    const encontrarUsuario = await knex('clientes')
        .where({ email })
        .returning('*')
    req.validarEmailCliente =
        encontrarUsuario.length === 0 ? null : encontrarUsuario[0]
    next()
}

const validarCPF = async (req, res, next) => {
    const { cpf } = req.body
    const encontrarCPF = await knex('clientes').where({ cpf }).returning('*')
    req.validarCPF = encontrarCPF.length === 0 ? null : encontrarCPF[0]
    next()
}

const buscarCategoriaID = async (req, res, next) => {
    const { categoria_id } = req.body
    const categoriaEncontrada = await knex('categorias').where({
        id: categoria_id,
    })
    if (categoriaEncontrada.length === 0) {
        return res
            .status(404)
            .json({ mensagem: 'Insira uma categoria válida.' })
    }
    next()
}

const buscarProdutoPorID = async (req, res, next) => {
    const { id } = req.params

    try {
        const produtoEncontrado = await knex('produtos').where({ id })
        if (produtoEncontrado.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    validarEmail,
    schemaCorpo,
    buscarCategoriaID,
    buscarProdutoPorID,
    validarCPF,
    validarEmailCliente,
}
