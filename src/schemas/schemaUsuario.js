const joi = require('joi');

const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email válido.'
    }),
    senha: joi.string().min(6).required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.min': 'Informe ao menos 6 caracteres para o campo senha.'
    })
});

module.exports = schemaUsuario;