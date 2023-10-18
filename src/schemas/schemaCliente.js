const joi = require('joi')

const schemaCliente = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'O email precisa ser do tipo string.',
        'string.email': 'O campo email precisa ser válido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email não pode ser vazio.',
    }),
    nome: joi.string().trim().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome não pode ser vazio.',
        'string.base': 'O campo nome precisa ser do tipo string.',
    }),
    cpf: joi.string().trim().required().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf não pode ser vazio.',
        'string.base': 'O campo cpf precisa ser do tipo string.',
    }),
    cep: joi.string().trim().messages({
        'string.empty': 'O campo cep não pode ser vazio.',
        'string.base': 'O campo cep precisa ser do tipo string.',
    }),
    rua: joi.string().trim().messages({
        'string.empty': 'O campo rua não pode ser vazio.',
        'string.base': 'O campo rua precisa ser do tipo string.',
    }),
    numero: joi.string().trim().messages({
        'string.empty': 'O campo numero não pode ser vazio.',
        'string.base': 'O campo numero precisa ser do tipo string.',
    }),
    bairro: joi.string().trim().messages({
        'string.empty': 'O campo bairro não pode ser vazio.',
        'string.base': 'O campo bairro precisa ser do tipo string.',
    }),
    cidade: joi.string().trim().messages({
        'string.empty': 'O campo cidade não pode ser vazio.',
        'string.base': 'O campo cidade precisa ser do tipo string.',
    }),
    estado: joi.string().trim().messages({
        'any.required': 'O campo estado é obrigatório.',
        'string.empty': 'O campo estado não pode ser vazio.',
        'string.base': 'O campo estado precisa ser do tipo string.',
    }),
})

module.exports = {
    schemaCliente,
}
