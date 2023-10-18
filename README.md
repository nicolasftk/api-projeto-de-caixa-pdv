<!DOCTYPE html>
<html>
<head>
</head>
<body>

<h1>API de PDV (Ponto de Venda) - Guia do Usuário</h1>

<p>Bem-vindo à API do Ponto de Venda (PDV). Este é um projeto backend que fornece endpoints para gerenciar categorias, clientes, pedidos, produtos e usuários. Abaixo, você encontrará informações completas sobre todas as funcionalidades da API.</p>

<h2>Instalação</h2>

<p>Antes de começar, certifique-se de que você tenha o seguinte:</p>

<ul>
  <li>Node.js instalado (versão recomendada: 14.x)</li>
  <li>Banco de dados PostgreSQL configurado com o nome <code>pdv</code></li>
</ul>

<p>Certifique-se de que o PostgreSQL esteja em execução e o banco de dados <code>pdv</code> esteja disponível.</p>

<p>Para configurar e executar o projeto, siga estas etapas:</p>

<ol>
  <li>Clone o repositório para o seu ambiente local</li>
</ol>

<ol start="2">
  <li>Instale as dependências do projeto:</li>
</ol>

<pre><code>npm install
</code></pre>

<ol start="3">
  <li>Execute as migrações do banco de dados para criar as tabelas necessárias:</li>
</ol>

<pre><code>execute o arquivo dump.sql no seu banco de dados PostgreSQL
</code></pre>

<ol start="4">
  <li>Configure suas variáveis de desenvolvimento:</li>
</ol>

<pre><code>crie o arquivo .env guiando-se pelo .env.examplo
</code></pre>

<ol start="5">
  <li>Execute o servidor:</li>
</ol>

<pre><code>npm start
</code></pre>

<p>A API estará disponível por padrão em <code>http://localhost:3000</code>.</p>

<h2>Endpoints</h2>

<p>A seguir, estão listados todos os endpoints disponíveis na API, com informações completas sobre cada funcionalidade:</p>

<h3>Listar Categorias</h3>

<ul>
  <li><strong>Método:</strong> GET</li>
  <li><strong>URL:</strong> <code>/categoria</code></li>
  <li><strong>Descrição:</strong> Obtém uma lista de todas as categorias cadastradas.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h2>Usuário</h2>

<h3>Cadastrar Usuário</h3>

<ul>
  <li><strong>Método:</strong> POST</li>
  <li><strong>URL:</strong> <code>/usuario</code></li>
  <li><strong>Descrição:</strong> Permite cadastrar um novo usuário no sistema.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>201 (Created) - Requisição bem-sucedida e usuário criado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Efetuar Login do Usuário</h3>

<ul>
  <li><strong>Método:</strong> POST</li>
  <li><strong>URL:</strong> <code>/login</code></li>
  <li><strong>Descrição:</strong> Permite que um usuário cadastrado realize o login no sistema.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "email": "jose@email.com",
    "senha": "jose"
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida e token de autenticação gerado
401 (Unauthorized) - Credenciais inválidas
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Detalhar Perfil do Usuário Logado</h3>

<ul>
  <li><strong>Método:</strong> GET</li>
  <li><strong>URL:</strong> <code>/usuario</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado visualize os dados do seu próprio perfil.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida
401 (Unauthorized) - Token de autenticação ausente ou inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Editar Perfil do Usuário Logado</h3>

<ul>
  <li><strong>Método:</strong> PUT</li>
  <li><strong>URL:</strong> <code>/usuario</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado atualize informações do seu próprio cadastro.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "nome": "José Silva",
    "email": "josesilva@email.com",
    "senha": "nova_senha"
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida e perfil de usuário atualizado
401 (Unauthorized) - Token de autenticação ausente ou inválido
404 (Not Found) - Usuário não encontrado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h2>Produtos</h2>

<h3>Cadastrar Produto</h3>

<ul>
  <li><strong>Método:</strong> POST</li>
  <li><strong>URL:</strong> <code>/produto</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado cadastre um novo produto no sistema.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "descricao": "Produto Exemplo",
    "quantidade_estoque": 100,
    "valor": 1999,  // Valor em centavos (R$ 19.99)
    "categoria_id": 1,
    "produto_imagem": "https://exemplo.com/imagem.jpg" // opcional
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>201 (Created) - Requisição bem-sucedida e produto criado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Listar Produtos</h3>

<ul>
  <li><strong>Método:</strong> GET</li>
  <li><strong>URL:</strong> <code>/produto</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado liste todos os produtos cadastrados. É possível filtrar os produtos por categoria usando o parâmetro <code>categoria_id</code> na consulta.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida
401 (Unauthorized) - Token de autenticação ausente ou inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Detalhar Produto por ID</h3>

<ul>
  <li><strong>Método:</strong> GET</li>
  <li><strong>URL:</strong> <code>/produto/:id</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado obtenha detalhes de um produto específico com base no ID do produto.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida
401 (Unauthorized) - Token de autenticação ausente ou inválido
404 (Not Found) - Produto não encontrado
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Excluir Produto por ID</h3>

<ul>
  <li><strong>Método:</strong> DELETE</li>
  <li><strong>URL:</strong> <code>/produto/:id</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado exclua um produto específico. A exclusão está condicionada à ausência do produto em pedidos.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>204 (No Content) - Produto excluído com sucesso
404 (Not Found) - Produto não encontrado
403 (Forbidden) - Produto vinculado a pedidos (não pode ser excluído)
401 (Unauthorized) - Token de autenticação ausente ou inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h2>Clientes</h2>

<h3>Cadastrar Cliente</h3>

<ul>
  <li><strong>Método:</strong> POST</li>
  <li><strong>URL:</strong> <code>/cliente</code></li>
  <li><strong>Descrição:</strong> Permite que um usuário logado cadastre um novo cliente no sistema.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "nome": "Maria",
    "email": "maria@email.com",
    "cpf": "12345678901",
    <hr> A partir deste ponto são opcionais:
    "cep": "12345-678",
    "rua": "Rua Principal",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "Cidade",
    "estado": "SP"
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>201 (Created) - Requisição bem-sucedida e cliente criado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Editar Dados do Cliente</h3>

<ul>
  <li><strong>Método:</strong> PUT</li>
  <li><strong>URL:</strong> <code>/cliente/:id</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado atualize informações de um cliente cadastrado.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "nome": "Maria Silva",
    "email": "mariasilva@email.com",
    "cpf": "98765432109",
    <hr> A partir deste ponto são opcionais:
    "cep": "98765-432",
    "rua": "Rua Secundária",
    "numero": "456",
    "bairro": "Vila Nova",
    "cidade": "Cidade Nova",
    "estado": "RJ"
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida e dados do cliente atualizados
401 (Unauthorized) - Token de autenticação ausente ou inválido
404 (Not Found) - Cliente não encontrado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h2>Pedidos</h2>

<h3>Cadastrar Pedido</h3>

<ul>
  <li><strong>Método:</strong> POST</li>
  <li><strong>URL:</strong> <code>/pedido</code></li>
  <li><strong>Descrição:</strong> Permite cadastrar um novo pedido no sistema.</li>
  <li><strong>Corpo da Requisição:</strong></li>
</ul>

<pre><code>{
    "cliente_id": 1,
    "observacao": "Em caso de ausência, recomendo deixar com algum vizinho", *opcional
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
</code></pre>

<ul>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>201 (Created) - Requisição bem-sucedida e pedido criado
400 (Bad Request) - Sintaxe/formato inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h3>Listar Pedidos</h3>

<ul>
  <li><strong>Método:</strong> GET</li>
  <li><strong>URL:</strong> <code>/pedido</code></li>
  <li><strong>Descrição:</strong> Permite que o usuário logado liste todos os pedidos cadastrados. É possível filtrar os pedidos por cliente usando o parâmetro <code>cliente_id</code> na consulta.</li>
  <li><strong>Status Codes:</strong></li>
</ul>

<pre><code>200 (OK) - Requisição bem-sucedida
401 (Unauthorized) - Token de autenticação ausente ou inválido
500 (Internal Server Error) - Erro inesperado do servidor
</code></pre>

<h2>Projeto em desenvolvimento</h2>

<p>Este é um resumo das funcionalidades completas da API de PDV. Lembre-se de que o desenvolvimento de novas funcionalidades e aprimoramentos pode continuar no futuro.</p>

<h2>Contribuindo para API</h2>
<p>Para contribuir com a API PDV, siga estas etapas:</p>

<ol>
  <li>Bifurque este repositório.</li>
  <li>Crie um branch: <code>git checkout -b &lt;nome_branch&gt;</code>.</li>
  <li>Faça suas alterações e confirme-as: <code>git commit -m '&lt;mensagem_commit&gt;'</code>.</li>
  <li>Envie para o branch original: <code>git push origin &lt;nome_do_projeto&gt; / &lt;local&gt;</code>.</li>
  <li>Crie a solicitação de pull.</li>
</ol>

</body>
</html>
