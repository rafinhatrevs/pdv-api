const knex = require('../servicos/conexao');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const clienteEncontrado = await knex('clientes').where('id', cliente_id).first();

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        let valorTotal = 0;

        const produtosIds = pedido_produtos.map(produto => produto.produto_id);
        const produtos = await knex('produtos').whereIn('id', produtosIds);

        const produtosNaoEncontrados = produtosIds.filter(produtoId => !produtos.some(p => p.id === produtoId));

        if (produtosNaoEncontrados.length) {
            return res.status(404).json({ mensagem: `Produtos de ids: ${produtosNaoEncontrados.join(', ')} não encontrados.` });
        }

        for (let produto of pedido_produtos) {
            const produtoEncontrado = produtos.find(p => p.id === produto.produto_id);

            if (produtoEncontrado.quantidade_estoque < produto.quantidade_produto) {
                return res.status(400).json({ mensagem: `Não há estoque suficiente para o produto de id ${produto.produto_id}.` });
            }

            valorTotal += produtoEncontrado.valor * produto.quantidade_produto;
        }

        const [pedido] = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotal
        }).returning('*');

        for (let produto of pedido_produtos) {
            const produtoEncontrado = produtos.find(p => p.id === produto.produto_id);

            await knex('pedido_produtos').insert({
                pedido_id: pedido.id,
                produto_id: produto.produto_id,
                quantidade_produto: produto.quantidade_produto,
                valor_produto: produtoEncontrado.valor
            });

            await knex('produtos').where('id', produto.produto_id).update({ quantidade_estoque: produtoEncontrado.quantidade_estoque - produto.quantidade_produto });
        }

        return res.status(201).json(pedido);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        let pedidos = await knex('pedidos');

        if (cliente_id) {
            const clienteEncontrado = await knex('clientes').where('id', cliente_id).first();

            if (!clienteEncontrado) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
            }

            pedidos = await knex('pedidos').where('cliente_id', cliente_id);

            if (!pedidos.length) {
                return res.status(404).json({ mensagem: 'Nenhum pedido encontrado para este cliente.' });
            }
        }

        if (!pedidos.length) {
            return res.status(404).json({ mensagem: 'Nenhum pedido encontrado.' });
        }

        return res.status(200).json(pedidos);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarPedido,
    listarPedidos
};