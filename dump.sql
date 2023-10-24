CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

INSERT INTO categorias (descricao) VALUES 
    ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games')
;

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    quantidade_estoque INT,
    valor INT,
    categoria_id INT,
  	FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2)
);

ALTER TABLE produtos
ADD CONSTRAINT unique_descricao UNIQUE (descricao);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL,
  observacao VARCHAR(255),
  valor_total INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);

CREATE TABLE pedido_produtos (
	id SERIAL PRIMARY KEY,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade_produto INT NOT NULL,
  valor_produto INT,
  FOREIGN KEY (pedido_id) REFERENCES pedidos (id),
  FOREIGN KEY (produto_id) REFERENCES produtos (id)
);

ALTER TABLE produtos ADD produto_imagem VARCHAR(255);