const knex = require('../bancoDeDados/conexão')

const listarCategorias = async (req, res) => {
    try {
        const categoriasEncontradas = await knex('categorias')
        return res.status(200).json(categoriasEncontradas)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    listarCategorias,
}
