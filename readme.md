# API REST SEGURANÇA

## AUTENTIFICAÇÃO E AUTORIZAÇÃO DE USUÁRIO;

## DIAGRAMA DA API:

<img src='./src/assets/diagramaapi.jpg'/>

#### CONSTRUÇÃO

O modelo de construção desta API usa a arquitetura MVC onde se separa as requisições de dados

1. <strong>Criar Usuário:</strong>
    * Se true: usuário não existe então será criado o usuário
    * Se False: usuário existe acesso negado

2. <strong>Usuário faz o login:</strong>
    * Se True: usuário logado recebe o a autorizações
    * se False: Acesso é negado.

3. <strong>usuários logado faz requisições</strong>
    * GET: busca usuários cadastrados.
    * GET por ID: busca um usuário cadastrado por id.
    * PUT: Edita os valores dos usuários no banco de dados.
    * DELETE: Apaga informações de um usuário no banco de dados.

### AUTENTIFICAÇÃO:

Este sistema requer a Autenticação de usuário para acessar as rotas, a autenticação é realizada através do login e senha;
O usuário envia o Login e senha para o sistema, o sistema compara a senha com a senha criptografadas que está salva na base do banco de dados (Esta criptografia foi realizada com o BCRYPT). Assim que o sistema identifica a criptografia confere com a senha e o e-mail do usuário e ele confere com os dados do usuário localizado no banco de dados então é concedido a permissão de acesso ao usuário:

<strong>senha criptografada</strong>

Ao criar um usuário como no exemplo abaixo usando a senha '12345' o sistema usa o método HASH do BCRYPT e então criptografa a senha, salvando a mesma com um SALT de 12 para evitar a descriptografar, somente via esta API é possível descriptografar a senha.

<img src='./src/assets/dadosenviadosparacadastrar.png' />

<strong>Retorno da API caso o usuário informado não exista:</strong>

<img src='./src/assets/dadosregistrados.png'/>

*OBS: neste caso a senha não retorna com o valor  '12345' e sim criptografada impossível ser decifrada apenas com o uso do método COMPARE do BCRYPT*

<strong>Enviando dados para o login:</strong>

<img src='./src/assets/dadosusuario.png' />

<strong>Caso Dados estejam corretos:</strong>

<img src='./src/assets/loginsucesso.png' />

O sistema gera um TOKEN com expiração de 7dias que então será enviado para header AUTHORIZATION.
*OBS: Em caso do Retorno da Rota ‘login’ ser 200 ele retorna com o STATUS CODE PADRÃO PARA HTTP.

<strong>caso alguns dados como E-mail ou senha estejam incorretos.</strong>

<img src='./src/assets/login-error.png'/>

*OBS: Em Caso de algum dado informado para o login esteja incorreto, como o E-mail e a senha e o mesmo não conferir com a comparação interna do sistema por meio do TOKEN BEARER no AUTHORIZATION HEADER então por padrão a API retorna erro conforme o STATUS CODE HTTP 404.*

### AUTORIZAÇÃO:

