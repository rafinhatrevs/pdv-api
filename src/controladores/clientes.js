const knex = require('../servicos/conexao');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailEncontrado = await knex('clientes').where('email', email).first();

        if (emailEncontrado) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const cpfEncontrado = await knex('clientes').where('cpf', cpf).first();

        if (cpfEncontrado) {
            return res.status(400).json({ mensagem: 'O cpf informado já está em uso.' });
        }

        const dadosCliente = { nome, email, cpf };

        if (cep) { dadosCliente.cep = cep; }
        if (rua) { dadosCliente.rua = rua; }
        if (numero) { dadosCliente.numero = numero; }
        if (bairro) { dadosCliente.bairro = bairro; }
        if (cidade) { dadosCliente.cidade = cidade; }
        if (estado) { dadosCliente.estado = estado; }

        const cliente = await knex('clientes').insert(dadosCliente).returning('*');

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const clienteEncontrado = await knex('clientes').where('id', id).first();

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        if (email !== clienteEncontrado.email) {
            const emailEncontrado = await knex('clientes').where('email', email).first();

            if (emailEncontrado) {
                return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
            }
        }

        if (cpf !== clienteEncontrado.cpf) {
            const cpfEncontrado = await knex('clientes').where('cpf', cpf).first();

            if (cpfEncontrado) {
                return res.status(400).json({ mensagem: 'O cpf informado já está em uso.' });
            }
        }

        const alteracoes = { nome, email, cpf };

        if (cep) { alteracoes.cep = cep; }
        if (rua) { alteracoes.rua = rua; }
        if (numero) { alteracoes.numero = numero; }
        if (bairro) { alteracoes.bairro = bairro; }
        if (cidade) { alteracoes.cidade = cidade; }
        if (estado) { alteracoes.estado = estado; }

        await knex('clientes').where('id', id).update(alteracoes);

        return res.status(200).json({ mensagem: 'Cliente alterado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');

        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await knex('clientes').where('id', id).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        return res.status(200).json(cliente);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharCliente
};