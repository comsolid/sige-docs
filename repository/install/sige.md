# SiGE

## Baixando SiGE do Github para desenvolvimento

Para realizar clone da última versão do SiGE:

~~~
$ git clone https://github.com/comsolid/sige.git
~~~

**obs.:** é necessário instalar o git. No Ubuntu podemos instalar através do comando:

~~~
$ sudo apt-get install git
~~~

**obs.:** instale a partir do repositório somente se você está interessado em contribuir,
estudar o código ou apenas testando.

## Baixando uma versão estável SiGE

Procure pela versão mais atual do SiGE em:

<https://github.com/comsolid/sige/releases>

Renomeie a pasta para `sige` caso necessário.

## Instalando Dependências

A versão utilizada pelo SiGE é [latest][latest].

[latest]: http://framework.zend.com/downloads/latest#ZF1 "Zend latest"

A instalação é do Zend é feita através do [Composer](https://getcomposer.org/). Baixe o composer
dentro do diretório `@@sigedir`, e instale as dependências.

~~~
cd @@sigedir
php -r "readfile('https://getcomposer.org/installer');" | php
php composer.phar install
~~~

## Permitir escrita para HTMLPurifier e Captcha

É necessário dar permissão total a dois diretórios, faça:

~~~
$ cd @@sigedir/library/HTMLPurifier/DefinitionCache/
$ mkdir Serializer
$ chmod 777 Serializer/
$ cd @@sigedir/public/
$ mkdir captcha
$ chmod 777 captcha/
~~~

## Configurar SiGE para ambiente de produção

~~~
$ cd @@sigedir/public
$ nano .htaccess
~~~

Mude `SetEnv APPLICATION_ENV development` para `SetEnv APPLICATION_ENV production`.

## Configurar conexão com base de dados

Com o projeto configurado vamos editar os parâmetros de conexão com o PostgreSQL.
Dentro do diretório do projeto abra o arquivo `@@sigedir/application/configs/application.ini`,
copie os dados para a seção `[production]` (cole abaixo de `autoloaderNamespaces[] = "Sige"`)
e edite os parâmetros abaixo:

~~~ini
resources.db.params.host     = "localhost"
resources.db.params.dbname   = "database"
resources.db.params.username = "postgres"
resources.db.params.password = "**secret**"
~~~

## Configurar SMTP para envio de e-mail

Temos também que configurar o envio de e-mail para validar participantes, recuperação de
senhas, etc. Ainda no arquivo `@@sigedir/application/configs/application.ini`,
copie o trecho a seguir e cole logo abaixo dos dados da conexão com o banco. Edite o trecho:

~~~ini
resources.mail.transport.type = "smtp"; não precisa editar
resources.mail.transport.host = "smtp.esl.com"; servidor gmail: smtp.gmail.com
resources.mail.transport.port = "587";465
resources.mail.transport.ssl  = "tls"
resources.mail.transport.auth = "login"; não precisa editar
resources.mail.transport.username   = "esl@esl.org";
resources.mail.transport.password   = "**secret**"
resources.mail.transport.register   = true; True by default
resources.mail.defaultFrom.email    = "esl@esl.org"
resources.mail.defaultFrom.name     = "I ESL"
resources.mail.defaultReplyTo.email = "esl@esl.org"
resources.mail.defaultReplyTo.name  = "I ESL"
~~~

**obs.:** para a linha `resources.mail.transport.port`:

* 587 is the Outgoing server (SMTP) port for IMAP. It uses a TLS encryption connection.
* 587 é a porta de Saída de serviço (SMTP) para IMAP. Ela usa conexão TLS criptografada.
* 465 is the Outgoing server (SMTP) port for POP. It uses an SSL encryption connection.
* 465 é a porta de Saída de serviço (SMTP) para POP. Ela usa conexão SSL criptografada.

Mais detalhes em [Zend_Mail][Zend_Mail].

[Zend_Mail]: http://framework.zend.com/manual/1.12/en/zend.application.available-resources.html#zend.application.available-resources.mail "Zend_Mail"

## Configurar Encontro

Após criar um encontro no banco de dados, temos um `id_encontro`. No arquivo
`@@sigedir/application/configs/application.ini` edite a linha:

~~~ini
encontro.codigo = 1
~~~

#### Observação:

Mude o valor a cada novo encontro.

## Crie o primeiro usuário administrador

Abra o SiGE no navegador e crie um usuário. Se tudo der certo um e-mail com uma
senha padrão foi enviado para você. Tente fazer um login.

No banco de dados, na tebela `pessoa`, modifique a coluna `administrador` para `true`.

## Tradução (i18n)

Para traduzir as mensagens do SiGE você deve editar o arquivo `@@sigedir/application/Bootstrap.php`.
Na função `_initTranslate` edite a linha:

~~~php
$locale = "pt_BR";
~~~

Verifique as traduções disponíveis em `@@sigedir/application/langs`. Coloque em `$locale` o mesmo
nome do diretório da sua língua padrão.

Para traduzir as mensagens que estão nos arquivos Javascript abra o arquivo
`@@sigedir/application/layouts/scripts/twbs3.phtml`.

Procure a linha:

~~~php
$this->headScript()->prependFile($this->baseUrl('js/jed/locale/pt_BR.js'));
~~~

e mude para a língua desejada. As opções estão em `@@sigedir/public/js/jed/locale`.

## Certificados

Os arquivos relativos aos certificados, participante e palestrante, ficam localizados
em `@@sigedir/public/img/certificados/`. Lá teremos um diretório `default/` que contém
arquivos iniciais para que um certificado possa ser gerado sem nenhuma configuração.

Para criar certificados para um determinado encontro devemos criar um diretório
em `@@sigedir/public/img/certificados/` com o `id_encontro` do encontro. Por exemplo,
se `id_encontro` for 1, criaremos o diretório `@@sigedir/public/img/certificados/1/`.

Utilize os arquivos `modelo.svg` e `assinatura-modelo.svg` dentro de `@@sigedir/public/img/certificados/default/`
como modelos para a criação de seus certificados. Eles possuem as marcações e os tamanhos
específicos. Os tamanhos são:

**Arquivo**            **Tamanho**
-----------            -------------------------------------------------
modelo.svg             1052x744 (mesmo tamanho de uma folha A4 paisagem)
assinatura-modelo.svg  250x140

**obs.:** o arquivo `modelo.svg` possui camadas para que ao trabalhar em cima do molde
você não se atrapalhe com outros objetos. Usando Inkscape acesse as camadas com o comando
*Shift + Ctrl + L*.

Após finalização do modelo, exporte o arquivo para **JPG**. Como o Inkscape não
exporta diretamente para essa extensão, utilize o GIMP para essa tarefa.

O certificado do SiGE suporta até três assinaturas. Para isso você deve exportar o arquivo
de assinatura da seguinte forma: `assinatura-1.png` - para que a assinatura apareça
a esquerda do certificado, `assinatura-2.png` - para que a assinatura apareça no centro
e `assinatura-3.png` - para que apareça a direita.

As assinaturas são opcionais e podem ser usadas da maneira que você deseja. Por exemplo,
se você possui um certificado que tenha algum detalhes no centro você pode optar por
criar apenas as assinaturas `assinatura-1.png` e `assinatura-3.png`.

**obs.:** Note que o arquivo de assinaturas possui a extensão **PNG**. Por ser uma
imagem pequena e que necessita de *alpha*, optamos por usá-la.

Abaixo uma simulação da árvore de diretórios `@@sigedir/public/img/certificados/`:

~~~
@@sigedir/public/img/certificados/
|
+ -- 1/
|    |
|    + -- modelo.jpg
|         assinatura-1.png
|         assinatura-3.png
|
+ -- default/
     |
     + -- modelo.jpg
          modelo.svg
          assinatura-modelo.png
          assinatura-1.png
~~~

## Dados do evento

A página inicial contém os dados do evento. Para modificar os dados basta editar o arquivo
`@@sigedir/public/js/index/index.js`.

Nesse arquivo temos um objeto chamado `conference`, no qual você vai descrever seu encontro.

Comece editando o nome curto do encontro, juntamente com o nome completo, por exemplo:

~~~javascript
short_name: 'COMSOLiD',
full_name: 'Comunidade Maracanauense de Software Livre e Inclusão Digital',
~~~

### Contagem Regressiva

Para modficar a data e os dados referentes a contagem regressiva que aparece na página
inicial do SiGE, modifique os atributos `starts_at` e `ends_at`, por exemplo:

~~~javascript
starts_at:  moment(new Date(2014, 11, 16, 8, 0)),
ends_at:  moment(new Date(2014, 11, 19, 17, 0)),
~~~

**obs.:** lembrando que em Javascript os meses vão de 0 a 11.

~~~
month
    Integer value representing the month, beginning with 0 for January to 11 for December.
~~~

Fonte: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date>

### Características do encontro

Defina as características ou _features_ do seu encontro, por exemplo:

~~~javascript
features: {
    columns: 3,
    list: [
        {
            title: 'Feature 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            icon: 'fa-graduation-cap'
        },
        {
            title: 'Feature 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            icon: 'fa-gamepad'
        },
        {
            title: 'Feature 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            icon: 'fa-desktop'
        }
    ]
},
~~~

O atributo `columns` pode ter valor `2` ou `3`.
Você pode criar quantas `features` quiser adicionando ao atributo `list`.

É recomendado que você crie no máximo `6` features, para que não polua muito a página.

Os ícones são do _toolkit_ [FontAwesome](https://fortawesome.github.io/Font-Awesome/).
Acesse o link [Icons](https://fortawesome.github.io/Font-Awesome/icons/) e veja as opções.

### Mapa

Modifique as coordenadas do local onde acontecerá seu encontro, por exemplo:

~~~javascript
map: {
    latitude: -3.87259,
    longitude: -38.610976,
    zoom: 17,
    address: 'IFCE - Campus Maracanaú - Av. Parque Central...'
}
~~~

**Obs.:** Existem algumas políticas de uso referentes ao OpenStreetMap (api usada para mostrar o mapa).
Para um bom uso da api:

* Use somente `User-Agent` válidos;
* Não envie cabeçalhos `no-cache` ("Cache-Control: no-cache", "Pragma: no-cache" etc);
* Faça cache do `Tile` (`Tile` é a imagem do mapa obitida através da api, como o local não deve mudar, esse recurso deve ficar em cache);
* No máximo são usadas duas threads de download.

Browsers modernos com a configuração padrão geralmente passam por todas as especificações acima.

Referência:

* <http://wiki.openstreetmap.org/wiki/Tile_usage_policy>
* <https://leanpub.com/leaflet-tips-and-tricks/read>

### Redes Sociais

A última página contém os links para as redes sociais do seu encontro.
Edite de acordo com o exemplo abaixo:

~~~javascript
social_networks: [
    {
        url: 'https://twitter.com/comsolid',
        channel: 'twitter'
    },
    {
        url: 'https://facebook.com/comsolid',
        channel: 'facebook'
    },
    {
        url: 'https://github.com/comsolid',
        channel: 'github'
    },
],
~~~

Os botões são gerados usando o [Social Buttons 3](http://noizwaves.github.io/bootstrap-social-buttons/3/),
utilize os nomes oferecidos pela api.

### Por que as configurações em JS e não no banco de dados?

Você pode estar se perguntado isso e a resposta é:

> Essas configurações são feitas apenas uma vez, e nós da COMSOLiD achamos que seria trabalhoso para o servidor ter que
    carregar essas informações do banco de dados cada vez que a página fosse acessada.

### Twitter

No arquivo `@@sigedir/application/configs/application.ini`
altere as linhas:

~~~ini
twitter.username = "els"; sem "@"
twitter.hashtags = "els1"; sem "#" e separadas por ","
~~~

## Layout do Sistema

Por usar o Twitter Bootstrap 3, fica mais fácil mudar o tema, ou até mesmo criar um.

O SiGE suporta por padrão 3 temas:

* [Padrão](http://getbootstrap.com/)
* [Lumen](http://bootswatch.com/lumen/)
* [Darkly](http://bootswatch.com/darkly/)

Outros temas podem ser encontrados em [Bootswatch](http://bootswatch.com/).

Para editar o tema edite o arquivo `@@sigedir/application/layouts/twbs3.phtml`, procure pela linha:

~~~php
$this->headLink()->prependStylesheet(
    $this->baseUrl('lib/css/bootstrap/default/bootstrap.min.css'));
~~~

e mude `default` para `lumen` ou `darkly` ou ainda um tema que você tenha baixado.

Os temas devem ficar em `@@sigedir/lib/css/bootstrap/`.

## Imagens do Sistema

<!-- TODO: colocar os caminhos para todas as imagens que devem ser customizadas -->

## Versão Móvel

Edite o arquivo `@@sigedir/application/layouts/scripts/mobile.phtml`:

Linha 44: `<h1>COMSOLiD <?=date('Y') ?></h1>`
