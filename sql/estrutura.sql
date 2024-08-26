create database pdv;

create table usuarios (
	id serial primary key,
    nome varchar not null,
    email varchar not null unique,
    senha varchar not null
);

create table categorias (
	id serial primary key,
    descricao varchar not null
);

create table produtos (
	id serial primary key,
    descricao varchar not null,
    quantidade_estoque int not null,
    valor int not null,
    categoria_id int not null references categorias(id)
);

create table clientes (
	id serial primary key,
    nome varchar not null,
    email varchar not null unique,
    cpf varchar(11) not null unique,
    cep varchar(8),
    rua varchar,
	numero int,
	bairro varchar,
	cidade varchar,
	estado varchar(2) 
);

alter table produtos 
add column imagem_url varchar 

create table pedidos (
	id serial primary key,
	cliente_id int not null references clientes(id),
	observacao varchar,
	valor_total int not null 
);

create table pedido_produtos (
	id serial primary key,
	pedido_id int not null references pedidos(id),
	produto_id int not null references produtos(id),
	quantidade_produto int not null,
	valor_produto int not null
);