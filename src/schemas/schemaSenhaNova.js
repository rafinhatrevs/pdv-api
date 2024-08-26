const joi = require('joi');

const schemaSenhaNova = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email válido.'
    }),
    senha_antiga: joi.string().min(6).required().messages({
        'any.required': 'O campo senha_antiga é obrigatório.',
        'string.empty': 'O campo senha_antiga é obrigatório.',
        'string.min': 'Informe ao menos 6 caracteres para o campo senha_antiga.'
    }),
    senha_nova: joi.string().min(6).required().messages({
        'any.required': 'O campo senha_nova é obrigatório.',
        'string.empty': 'O campo senha_nova é obrigatório.',
        'string.min': 'Informe ao menos 6 caracteres para o campo senha_nova.'
    })
});

module.exports = schemaSenhaNova;