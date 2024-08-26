const joi = require('joi');

const schemaPedido = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.base': 'Informe um valor válido para cliente_id.',
        'number.integer': 'Informe um valor válido para cliente_id.',
        'number.positive': 'Informe um valor válido para cliente_id.'
    }),
    observacao: joi.string(),
    pedido_produtos: joi.array().min(1).items(
        joi.object({
            produto_id: joi.number().integer().positive().required().messages({
                'any.required': 'O campo produto_id é obrigatório.',
                'number.base': 'Informe um valor válido para produto_id.',
                'number.integer': 'Informe um valor válido para produto_id.',
                'number.positive': 'Informe um valor válido para produto_id.'
            }),
            quantidade_produto: joi.number().integer().positive().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório.',
                'number.base': 'Informe um valor válido para quantidade_produto.',
                'number.integer': 'Informe um valor válido para quantidade_produto.',
                'number.positive': 'Informe um valor válido para quantidade_produto.'
            })
        })
    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório.',
        'array.empty': 'O campo pedido_produtos não pode estar vazio.',
        'array.base': 'O campo pedido_produtos deve ser um array.',
        'array.includes': 'Cada item em pedido_produtos deve ter produto_id e quantidade_produto válidos.',
        'array.min': 'O campo pedido_produtos deve conter pelo menos um produto.'
    }),
});

module.exports = schemaPedido;