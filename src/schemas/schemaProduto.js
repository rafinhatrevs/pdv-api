const joi = require('joi');

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório.',
        'string.empty': 'O campo descricao é obrigatório.'
    }),
    quantidade_estoque: joi.number().integer().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'Informe um valor válido para quantidade_estoque.',
        'number.integer': 'Informe um valor válido para quantidade_estoque.',
        'number.positive': 'Informe um valor válido para quantidade_estoque.'
    }),
    valor: joi.number().integer().positive().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'Informe um valor válido.',
        'number.integer': 'Informe um valor válido.',
        'number.positive': 'Informe um valor válido.'
    }),
    categoria_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'Informe um valor válido para categoria_id.',
        'number.integer': 'Informe um valor válido para categoria_id.',
        'number.positive': 'Informe um valor válido para categoria_id.'
    })
});

module.exports = schemaProduto;