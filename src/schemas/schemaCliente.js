const joi = require('joi');

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email válido.'
    }),
    cpf: joi.string().length(11).required().messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.length': 'Informe um cpf válido.'
    }),
    cep: joi.string().length(8).messages({
        'string.length': 'Informe um cep válido.'
    }),
    rua: joi.string(),
    numero: joi.number().integer().positive().messages({
        'number.base': 'Informe um número válido.',
        'number.integer': 'Informe um número válido.',
        'number.positive': 'Informe um número válido.'
    }),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string().length(2).messages({
        'string.length': 'Informe um estado válido.'
    })
});

module.exports = schemaCliente;