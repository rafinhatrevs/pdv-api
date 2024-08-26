const knex = require('../servicos/conexao');
const jwt = require('jsonwebtoken');

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado.' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await knex('usuarios').where('id', id).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const { senha, ...loginUsuario } = usuario;

        req.usuario = loginUsuario;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = validarLogin;