# Base de dados

## Schema da Base de dados

A instalação da base de dados é feita pelo arquivo `ddl-schema.sql`. Abra o arquivo
e defina alguns parâmetros:

Encoding do servidor

~~~sql
SET client_encoding = 'LATIN1';
~~~

ou

~~~sql
SET client_encoding = 'UTF8';
~~~

Permissão ao usuário do banco de dados

~~~sql
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
~~~

Modifique `postgres` para seu usuário.

Note que o script possui `START TRANSACTION;` e `ROLLBACK;`. Faça um teste inicial
e execute o script para se certificar que tudo irá correr bem. Por fim substitua
o comando `ROLLBACK;` por `COMMIT;` e execute novamente o script.

#### Observação:

Para PostgreSQL 9.2 para trás comentar a linha 12:

~~~sql
SET lock_timeout = 0;
~~~

Para isso basta colocar `--` no início, dessa forma:

~~~sql
--SET lock_timeout = 0;
~~~

Esse comando faz parte das versões 9.3 para frente, mas não prejudica o uso de versões
mais antigas.

## Dados iniciais do sistema

A inserção dos dados iniciais pode ser encontrada em `ddl-dados-iniciais.sql`.
Modifique as tabelas `estado, instituicao, municipio e sala` de acordo com sua necessidade.

**obs.:** para base de dados que usam codificação `LATIN1` utilize o script `ddl-dados-iniciais-latin1.sql`.

As outras tabelas já estão devidamente preparadas.

Teste a execução de script e remova `START TRANSACTION;` e `ROLLBACK;`.

## Criando um novo encontro

O primeiro passo para criar um encontro, e adicionar um registro na tabela `encontro`
da seguinte forma:

~~~sql
INSERT INTO encontro(nome_encontro, apelido_encontro, data_inicio, data_fim,
    periodo_submissao_inicio, periodo_submissao_fim)
    VALUES ('I Encontro de Software Livre', 'I ESL', '2013-11-07', '2013-11-09',
    '2013-05-01', '2013-11-06');
~~~

**obs.:** a coluna `ativo` será removida em breve.

Depois verifique o `id_encontro` gerado e crie dois registros na tabela `mensagem_email`,
um para cada mensagem de `tipo_mensagem_email`:

~~~sql
INSERT INTO mensagem_email(id_encontro, id_tipo_mensagem_email,
		mensagem, assunto, link)
    VALUES (1, 1, 'Nome: {nome}, E-mail: {email}, Senha: {senha},
    	<a href="{href_link}" target="_blank">Clique aqui</a>',
    	'I ESL - Cadastro Encontro',
    	'http://www.esl.org/login');
~~~

**obs.:** Note que a `mensagem` traz elementos dentro de `{}`. Eles são utilizados no PHP
para substiruir valores reais, tornando a mensagem dinâmica.

Vale lembrar que a mensagem pode ser escrita em HTML. Coloque apenas tags referentes ao `body`.

Outro ponto importante é configurar o *enconding* ao inserir um encontro e suas mensagens.
Para isso adicione `SET client_encoding = 'LATIN1';` no início do *insert*.

Da mesma forma crie a mensagem de recuperação de senha:

~~~sql
INSERT INTO mensagem_email(id_encontro, id_tipo_mensagem_email,
		mensagem, assunto, link)
    VALUES (1, 2, 'Nome: {nome}, E-mail: {email}, Senha: {senha},
    	<a href="{href_link}" target="_blank">Clique aqui</a>',
    	'I ESL - Recuperar Senha',
    	'http://www.esl.org/login');
~~~

Por ser um exemplo, as mensagens ficaram uma muito parecida com a outra. Você deve adaptar
de acordo com seu encontro.

**obs.:** esse passo serve somente para o primeiro encontro. Os demais podem ser criados
a partir do SiGE em `/adim/encontro/criar/`.
