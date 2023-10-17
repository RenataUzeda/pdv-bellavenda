# Desafio Final - Backend

![Static Badge](https://img.shields.io/badge/STATUS-Em%20Desenvolvimento-blue)

## Pré-visualização

![modulo5](./assets/preview.gif)

## Descrição do Projeto

Este projeto é uma API desenvolvida na arquitetura REST, para um sistema PDV (frente de caixa). As principais tecnologias utilizadas foram JavaScript, Node.js e PostgreSQL.

## Funcionalidades

- Listar categorias

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado

## Pré-requisitos

Para utilizar a aplicação, certifique-se de ter os seguintes recursos instalados:

- Node.js
- PostgreSQL
- Editor SQL
- Ferramenta de teste de APIs

## Instalação

Para configurar o projeto em ambiente local, siga estas etapas:

1. Clone o repositório:

   ```bash
   git clone https://github.com/RenataUzeda/pdv-bellavenda
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd pdv-bellavenda
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o arquivo [`dump.sql`](dump.sql) no editor/gerenciador SQL para configurar o banco de dados.

5. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis e seus respectivos valores, como mostrado no arquivo [`.env.exemplo`](.env.exemplo):

   ```
    PORT=

    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DB_NAME=
   ```

6. Inicie o servidor:

   ```
   npm run dev
   ```

## Como utilizar

Utilize o projeto com uma ferramenta de teste e depuração de APIs, como o Insomnia.

### Execução Local

Por padrão, o projeto estará rodando no localhost e utilizando a porta `3000` do servidor, definida no arquivo [`index.js`](./src/index.js).

### Deploy da API

De forma alternativa, esta API está hospedada no seguinte link e pode ser acessada: [`PDV Bellavenda`](https://pdv-bellavenda.cyclic.app/).

### Endpoints e exemplos de requisição

- **Listar Categorias**

  `GET` `/categoria`

  Essa rota lista todas as categorias cadastradas na API, não é necessário estar logado para acessar.

  Exemplo de requisição

  ```
  // GET /categoria
  // Sem conteúdo no corpo (body) da requisição
  ```

- **Cadastrar Usuário**

  `POST` `/usuario`

  Permite que o usuário cadastre-se na aplicação.

  Exemplo de requisição

  ```
  // POST /usuario
  {
      "nome": "Bellatrix",
      "email": "bellatrix@email.com",
      "senha": "123"
  }
  ```

- **Login do Usuário**

  `POST` `/login`

  Permite o usuario cadastrado realizar seu login no sistema.

  Exemplo de requisição

  ```
  // POST /login
  {
      "email": "bellatrix@email.com",
      "senha": "123"
  }
  ```

- **Detalhar Usuário**

  `GET` `/usuario`

  Essa rota detalha os dados do perfil do usuário que estiver logado (exceto a senha). Esta rota só é acessível mediante login.

  Exemplo de requisição

  ```
  // GET /usuario
  // Sem conteúdo no corpo (body) da requisição
  ```

- **Atualizar Usuário**

  `PUT` `/usuario`

  Essa rota identifica o ID do usuário logado através do token de autenticação e realiza alterações nos dados deste usuário.

  Exemplo de requisição

  ```
  // PUT /usuario
  {
      "nome": "Bellavenda",
      "email": "bellavenda@email.com",
      "senha": "321"
  }
  ```

## Em desenvolvimento

Ressaltamos que esta API está em fase de desenvolvimento, e receberá novas funcionalidades nas próximas semanas.

## Contribuidoras

- [daphnevilhar](https://github.com/daphnevilhar)
- [marina-barbosa](https://github.com/marina-barbosa)
- [marriett](https://github.com/marriett)
- [RenataUzeda](https://github.com/RenataUzeda)
- [sara-t-g-silva](https://github.com/sara-t-g-silva)

---

Este projeto foi desenvolvido como Desafio Final do curso de Backend da [Cubos Academy](https://cubos.academy/).
