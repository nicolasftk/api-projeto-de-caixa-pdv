const knex = require('../bancoDeDados/conexão')
const {
    uploadArquivo,
    atualizarArquivo,
    s3,
} = require('../utilis/configUploadS3')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req

    try {
        const produtos = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        }
        const novoProduto = await knex('produtos')
            .insert(produtos)
            .returning('*')

        if (file) {
            const id = novoProduto[0].id

            const urlFormatada = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT}/produtos/${id}/${file.originalname}`
            await uploadArquivo(req, id)

            const produtoImagem = await knex('produtos')
                .update({ produto_imagem: urlFormatada })
                .where({ id })
                .returning('*')
            return res.status(201).json(produtoImagem[0])
        }

        return res.status(201).json(novoProduto[0])
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const editarProdutos = async (req, res) => {
    const { id } = req.params
    const { file } = req
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    try {
        if (file) {
            const urlFormatada = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT}/produtos/${id}/${file.originalname}`
            await atualizarArquivo(req, id)

            const produtoImagem = await knex('produtos')
                .update({ produto_imagem: urlFormatada })
                .where({ id })
                .returning('*')

            return res.status(204).json()
        }
        const produtoAtualizado = await knex('produtos')
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            })
            .where({ id })
        return res.status(204).json()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params

    try {
        const produtoEncontrado = await knex('produtos').where({ id })

        if (produtoEncontrado.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }
        return res.json(produtoEncontrado)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const excluirProdutoPorId = async (req, res) => {
    const { id } = req.params
    try {
        const produtoEncontrado = await knex('produtos')
            .where({ id })
            .first()
            .returning('*')
        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }

        const produtoVinculadoAoPedido = await knex('pedido_produtos')
            .where('produto_id', id)
            .first()

        if (produtoVinculadoAoPedido) {
            return res.status(400).json({
                mensagem:
                    'Não é possível deletar o produto porque está vinculado ao pedido.',
            })
        }

        if (produtoEncontrado.produto_imagem !== null) {
            const urlFormatada = produtoEncontrado.produto_imagem.split('/')
            const imagem = await s3
                .deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: `produtos/${urlFormatada[4]}/${urlFormatada[5]}`,
                })
                .promise()

            const produtoDeletado = await knex('produtos')
                .where({ id })
                .delete()

            return res.status(204).send()
        }
        const produtoDeletado = await knex('produtos').where({ id }).delete()
        return res.status(204).send()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const listarProduto = async (req, res) => {
    const { categoria_id } = req.query

    try {
        let produtos

        if (categoria_id) {
            produtos = await knex('produtos')
                .where({ categoria_id })
                .select('*')
            if (produtos.length === 0) {
                return res.status(400).json({
                    mensagem: 'Não existe produto para a categoria informada.',
                })
            }
        } else {
            produtos = await knex('produtos').select('*')
        }
        return res.json(produtos)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}
module.exports = {
    cadastrarProduto,
    editarProdutos,
    detalharProduto,
    listarProduto,
    excluirProdutoPorId,
}
