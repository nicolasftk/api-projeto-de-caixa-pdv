const knex = require('../bancoDeDados/conexão')

const listarClientes = async (req, res) => {
    try {
        const clientesEncontrados = await knex('clientes')
        return res.status(200).json(clientesEncontrados)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const [clienteEncontrado] = await knex('clientes').where({ id })

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }

        return res.json(clienteEncontrado)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
        req.body

    if (req.validarCPF) {
        return res.status(400).json({
            mensagem: 'Já existe usuário cadastrado com o CPF informado.',
        })
    }
    if (req.validarEmailCliente) {
        return res.status(400).json({
            mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
        })
    }
    try {
        const novoCliente = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        }

        const cadastrarCliente = await knex('clientes')
            .insert(novoCliente)
            .returning('*')

        return res
            .status(201)
            .json({ mensagem: 'Cliente cadastrado com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const editarCliente = async (req, res) => {
    const { id } = req.params
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
        req.body

    try {
        const clienteEncontrado = await knex('clientes').where({ id }).first()

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }
        if (
            req.validarEmailCliente &&
            req.validarEmailCliente.id !== Number(id)
        ) {
            return res.status(400).json({
                mensagem: 'O e-mail informado já está sendo utilizado.',
            })
        }
        if (req.validarCPF && req.validarCPF.id !== Number(id)) {
            return res.status(400).json({
                mensagem: 'O CPF informado já está sendo utilizado.',
            })
        }

        const dadosClientesParaAtualizar = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        }

        const clienteAtualizado = await knex('clientes')
            .update(dadosClientesParaAtualizar)
            .where({ id })

        return res
            .status(204)
            .json({ mensagem: 'Cliente atualizado com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    listarClientes,
    detalharCliente,
    cadastrarCliente,
    editarCliente,
}
