const knex = require('../servicos/conexao');
const storage = require('../storage/s3');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await knex('categorias').where('id', categoria_id).first();

        if (!categoriaEncontrada) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        const produto = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');

        return res.status(201).json(produto);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoEncontrado = await knex('produtos').where('id', id).first();

        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const categoriaEncontrada = await knex('categorias').where('id', categoria_id).first();

        if (!categoriaEncontrada) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        await knex('produtos').where('id', id).update({ descricao, quantidade_estoque, valor, categoria_id });

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        let produtos = await knex('produtos');

        if (categoria_id) {
            const categoriaEncontrada = await knex('categorias').where('id', categoria_id).first();

            if (!categoriaEncontrada) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
            }

            produtos = await knex('produtos').where('categoria_id', categoria_id);

            if (!produtos.length) {
                return res.status(404).json({ mensagem: 'Nenhum produto encontrado para esta categoria.' });
            }
        }

        if (!produtos.length) {
            return res.status(404).json({ mensagem: 'Nenhum produto encontrado.' });
        }

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where('id', id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        return res.status(200).json(produto);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where('id', id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const pedidosProduto = await knex('pedido_produtos').where('produto_id', produto.id);

        if (pedidosProduto.length) {
            return res.status(400).json({ mensagem: 'Produto vinculado a um pedido não pode ser excluído.' });
        }

        if (produto.imagem_url) {
            const nomeArquivoImagem = produto.imagem_url.split('/').pop();
            await storage
                .from(process.env.S3_BUCKET)
                .remove([`/${nomeArquivoImagem}`]);
        };

        await knex('produtos').where('id', id).delete();

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const imagemProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where('id', id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const { imagem_url } = produto;
        const { file } = req;

        if (file) {
            if (imagem_url) {
                await storage.excluir(imagem_url);
            }

            const arquivo = await storage.upload(
                `images/imagem${id}_${Date.now()}.png`,
                file.buffer,
                file.mimetype
            );

            await knex('produtos').where('id', id).update({ imagem_url: arquivo.path });

            return res.status(200).json({ mensagem: 'Imagem atualizada com sucesso.', imagem_url: arquivo.url });
        }

        if (req.body.imagem === '') {
            if (imagem_url) {
                await storage.excluir(imagem_url);
            }

            await knex('produtos').where('id', id).update({ imagem_url: null });

            return res.status(200).json({ mensagem: 'Imagem deletada com sucesso.', imagem_url: null });
        }

        return res.status(400).json({ mensagem: 'A propriedade imagem deve ser fornecida na requisição.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto,
    imagemProduto
};