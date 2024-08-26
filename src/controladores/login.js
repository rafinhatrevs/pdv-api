const knex = require('../servicos/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioEncontrado = await knex('usuarios').where('email', email).first();

        if (!usuarioEncontrado) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

        const usuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        };

        return res.status(200).json({ usuario, token });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    login
};