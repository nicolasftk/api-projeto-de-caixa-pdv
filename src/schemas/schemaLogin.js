const joi = require('joi')

const schemaLogin = joi.object({
    email: joi.string().trim().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email não pode ser vazio.',
        'string.base': 'O campo email precisa ser do tipo string.',
    }),
    senha: joi.string().trim().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha não pode ser vazio.',
        'string.base': 'O campo senha precisa ser do tipo string.',
    }),
})

module.exports = {
    schemaLogin,
}
