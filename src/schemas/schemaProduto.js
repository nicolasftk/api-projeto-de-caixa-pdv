const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().trim().required().messages({
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição não pode ser vazio.',
        'string.base': 'O campo descrição precisa ser do tipo string.',
    }),
    quantidade_estoque: joi.number().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'O campo quantidade_estoque precisa ser do tipo number.',
        'number.positive': 'O campo quantidade_estoque precisa ser positivo.',
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'O campo valor precisa ser do tipo number.',
        'number.positive': 'O campo valor precisa ser positivo.',
    }),
    categoria_id: joi.number().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'O campo categoria_id precisa ser do tipo number.',
        'number.positive': 'O campo categoria_id precisa ser positivo.',
    }),
})

module.exports = { schemaProduto }
