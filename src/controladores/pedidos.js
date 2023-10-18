const knex = require('../bancoDeDados/conexão')
const transportador = require('../utilis/email')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
            return res
                .status(400)
                .json({ mensagem: 'Campos obrigatórios faltando ou vazios.' })
        }

        const cliente = await knex('clientes').where('id', cliente_id).first()
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }

        const produtosValidados = await Promise.all(
            pedido_produtos.map(async (item) => {
                const produto = await knex('produtos')
                    .where('id', item.produto_id)
                    .first()
                if (
                    !produto ||
                    produto.quantidade_estoque < item.quantidade_produto
                ) {
                    return null
                }
                if (produto) {
                    await knex('produtos')
                        .where('id', item.produto_id)
                        .update({
                            quantidade_estoque:
                                produto.quantidade_estoque -
                                item.quantidade_produto,
                        })
                }
                return {
                    produto_id: item.produto_id,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: produto.valor,
                }
            })
        )
        const produtoNulo = produtosValidados.includes(null)
        const produtosParaInserir = produtosValidados.filter(
            (item) => item !== null
        )

        if (
            produtosValidados === null ||
            produtosParaInserir.length === 0 ||
            produtoNulo === true
        ) {
            return res
                .status(400)
                .json({ mensagem: 'Nenhum produto válido encontrado.' })
        }

        const valor_total = produtosParaInserir.reduce(
            (total, item) =>
                total + item.quantidade_produto * item.valor_produto,
            0
        )

        const [pedido_id] = await knex('pedidos')
            .insert({
                cliente_id,
                observacao,
                valor_total,
            })
            .returning('id')

        await Promise.all(
            produtosParaInserir.map(async (item) => {
                await knex('pedido_produtos').insert({
                    pedido_id: pedido_id.id,
                    produto_id: item.produto_id,
                    quantidade_produto: item.quantidade_produto,
                    valor_total: item.quantidade_produto * item.valor_produto,
                })
            })
        )

        await transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: `${cliente.nome}, seu pedido foi cadastrado!`,
            text: '<h1>Seu pedido foi cadastrado com sucesso em nosso sistema!</h1>',
        })

        return res
            .status(201)
            .json({ mensagem: 'Pedido cadastrado com sucesso.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}
const listarPedido = async (req, res) => {
    const { cliente_id } = req.query
    try {
        if (cliente_id) {
            let pedidos = await knex('pedidos')
                .where({ cliente_id })
                .returning('*')
            if (pedidos.length === 0) {
                return res
                    .status(404)
                    .json({ mensagem: 'Pedidos não encontrado.' })
            }

            for (let i = 0; i < pedidos.length; i++) {
                let pedido_produtos = await knex('pedido_produtos')
                    .where({
                        pedido_id: pedidos[i].id,
                    })
                    .select('*')
                for (let j = 0; j < pedido_produtos.length; j++) {
                    let produtos = await knex('produtos')
                        .where({
                            id: pedido_produtos[j].produto_id,
                        })
                        .first()
                    pedido_produtos[j].valor_produto = produtos.valor
                    delete pedido_produtos[j].valor_total
                }

                pedidos[i] = {
                    pedido: {
                        id: pedidos[i].id,
                        valor_total: pedidos[i].valor_total,
                        observacao: pedidos[i].observacao,
                        cliente_id: pedidos[i].cliente_id,
                    },
                    pedido_produtos,
                }
            }

            return res.json(pedidos)
        }

        let pedidos = await knex('pedidos').returning('*')

        for (let i = 0; i < pedidos.length; i++) {
            let pedido_produtos = await knex('pedido_produtos')
                .where({
                    pedido_id: pedidos[i].id,
                })
                .select('*')
            for (let j = 0; j < pedido_produtos.length; j++) {
                let produtos = await knex('produtos')
                    .where({
                        id: pedido_produtos[j].produto_id,
                    })
                    .first()
                pedido_produtos[j].valor_produto = produtos.valor
                delete pedido_produtos[j].valor_total
            }

            pedidos[i] = {
                pedido: {
                    id: pedidos[i].id,
                    valor_total: pedidos[i].valor_total,
                    observacao: pedidos[i].observacao,
                    cliente_id: pedidos[i].cliente_id,
                },
                pedido_produtos,
            }
        }

        return res.json(pedidos)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarPedido,
    listarPedido,
}
