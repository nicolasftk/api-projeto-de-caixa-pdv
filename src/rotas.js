const express = require('express')
const {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario,
} = require('./controladores/usuarios')
const {
    validarEmail,
    schemaCorpo,
    buscarCategoriaID,
    buscarProdutoPorID,
    validarCPF,
    validarEmailCliente,
} = require('./intermediarios/validação')
const { schemaUsuario } = require('./schemas/schemaUsuario')
const { listarCategorias } = require('./controladores/categorias')
const login = require('./controladores/login')
const { schemaLogin } = require('./schemas/schemaLogin')
const { autenticarRota } = require('./intermediarios/autenticarRota')
const { schemaProduto } = require('./schemas/schemaProduto')
const {
    cadastrarProduto,
    editarProdutos,
    detalharProduto,
    excluirProdutoPorId,
    listarProduto,
} = require('./controladores/produtos')
const {
    listarClientes,
    detalharCliente,
    cadastrarCliente,
    editarCliente,
} = require('./controladores/clientes')
const { schemaCliente } = require('./schemas/schemaCliente')
const { cadastrarPedido, listarPedido } = require('./controladores/pedidos')
const multer = require('./utilis/multer')
const { schemaPedidos } = require('./schemas/schemaPedidos')

const rotas = express()

rotas.get('/categoria', listarCategorias)

rotas.post(
    '/usuario',
    schemaCorpo(schemaUsuario),
    validarEmail,
    cadastrarUsuario
)
rotas.post('/login', schemaCorpo(schemaLogin), validarEmail, login)

rotas.use(autenticarRota)

rotas.get('/usuario', detalharUsuario)

rotas.put(
    '/usuario',
    schemaCorpo(schemaUsuario),
    validarEmail,
    atualizarUsuario
)

rotas.post(
    '/produto',
    multer.single('produto_imagem'),
    schemaCorpo(schemaProduto),
    buscarCategoriaID,
    cadastrarProduto
)
rotas.put(
    '/produto/:id',
    multer.single('produto_imagem'),
    buscarProdutoPorID,
    schemaCorpo(schemaProduto),
    buscarCategoriaID,
    editarProdutos
)

rotas.get('/produto/:id', detalharProduto)
rotas.get('/produto', listarProduto)

rotas.get('/cliente', listarClientes)

rotas.get('/cliente/:id', detalharCliente)

rotas.post(
    '/cliente',
    schemaCorpo(schemaCliente),
    validarEmailCliente,
    validarCPF,
    cadastrarCliente
)

rotas.put(
    '/cliente/:id',
    schemaCorpo(schemaCliente),
    validarEmailCliente,
    validarCPF,
    editarCliente
)

rotas.delete('/produto/:id', excluirProdutoPorId)

rotas.post('/pedido', schemaCorpo(schemaPedidos), cadastrarPedido)

rotas.get('/pedido', listarPedido)

module.exports = rotas
