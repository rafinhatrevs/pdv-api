const knex = require('../servicos/conexao');
const bcrypt = require('bcrypt');
const transporter = require('../servicos/nodemailer');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailEncontrado = await knex('usuarios').where('email', email).first();

        if (emailEncontrado) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const [usuario] = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning(['id', 'nome', 'email']);

        return res.status(201).json(usuario);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const redefinirSenha = async (req, res) => {
    const { email, senha_antiga, senha_nova } = req.body;

    try {
        const usuarioEncontrado = await knex('usuarios').where('email', email).first();
        if (!usuarioEncontrado) { return res.status(404).json({ mensagem: 'Usuário não encontrado.' }); }

        const senhaValida = await bcrypt.compare(senha_antiga, usuarioEncontrado.senha);
        if (!senhaValida) { return res.status(400).json({ mensagem: 'Email e senha não correspondem.' }); }

        const senhaIgual = await bcrypt.compare(senha_nova, usuarioEncontrado.senha);
        if (senhaIgual) { return res.status(400).json({ mensagem: 'Nova senha não pode ser igual a anterior.' }); }

        const senhaNovaCriptografada = await bcrypt.hash(senha_nova, 10);

        await knex('usuarios').where('email', email).update('senha', senhaNovaCriptografada);

        transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: `${usuarioEncontrado.nome} <${email}>`,
            subject: 'Alteração de Senha',
            text: `
            Caro(a) ${usuarioEncontrado.nome}, sua senha foi alterada.

            Se você não fez essa alteração, entre em contato com o suporte.
            
            Att,`
        });

        return res.status(200).json({ mensagem: 'Senha alterada com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharPerfil = async (req, res) => {
    const idUsuario = req.usuario.id;

    try {
        const usuarioEncontrado = await knex('usuarios').where('id', idUsuario).first();

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const usuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        };

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editarPerfil = async (req, res) => {
    const idUsuario = req.usuario.id;
    const { nome, email, senha } = req.body;

    try {
        const usuarioEncontrado = await knex('usuarios').where('id', idUsuario).first();

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        if (email !== usuarioEncontrado.email) {
            const emailEncontrado = await knex('usuarios').where('email', email).first();

            if (emailEncontrado) {
                return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
            }
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const atualizacoes = { nome, email, senha: senhaCriptografada };

        await knex('usuarios').where('id', idUsuario).update(atualizacoes);

        return res.status(200).json({ mensagem: 'Perfil atualizado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarUsuario,
    redefinirSenha,
    detalharPerfil,
    editarPerfil
};