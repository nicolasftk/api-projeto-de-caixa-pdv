const joi = require('joi')

const schemaPedidos = joi.object({
    cliente_id: joi.number().required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.base': 'O campo cliente_id precisa ser do tipo number.',
    }),
    pedido_produtos: joi.array().required().messages({
        'number.base': 'O campo pedido_produtos precisa ser do tipo number.',
        'any.required': 'O campo pedido_produtos é obrigatório.',
    }),
    observacao: joi.string().messages({
        'string.base': 'O campo observacao precisa ser do tipo string.',
    }),
})

module.exports = {
    schemaPedidos,
}
