const joi = require('joi')

const schemaUsuario = joi.object({
    nome: joi.string().trim().required().messages({
        'string.base': 'O nome precisa ser do tipo string.',
        'string.empty': 'O campo nome não pode ser vazio.',
        'any.required': 'O campo nome é obrigatório.',
    }),
    email: joi.string().email().required().messages({
        'string.base': 'O email precisa ser do tipo string.',
        'string.email': 'Email invalido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email não pode ser vazio.',
    }),
    senha: joi.string().trim().required().messages({
        'string.base': 'O campo senha precisa ser do tipo string.',
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha não pode ser vazio.',
    }),
})

module.exports = {
    schemaUsuario,
}
