CREATE DATABASE pdv;

create table usuarios (
  id serial primary key,
  nome text not null,
  email text unique ,
  senha  text not null
);
drop table usuarios;


create table categorias (
  id serial primary key,
  descricao text
); 
drop table categorias;


create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque integer,
  valor integer, 
  categoria_id integer references categorias(id)
  );
drop table produtos;
  
create table clientes(
  id serial primary key,
  nome text,
  email text unique,
  cpf text unique,
  cep text,
  rua text,
  numero text,
  bairro text, 
  cidade text,
  estado text
 );
drop table clientes;

create table pedidos(
  id serial primary key,
  cliente_id integer references clientes(id),
  observacao text,
  valor_total integer
);
drop table pedidos;

create table pedido_produtos(
  id serial primary key,
  pedido_id integer references pedidos(id),
  produto_id integer references produtos(id),
  quantidade_produto integer,
  valor_total integer
);
drop table pedido_produtos;

alter table produtos
add column produto_imagem text;