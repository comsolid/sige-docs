# Configuração do Apache 2

Para simular um host no mundo real que utiliza Zend precisamos criar um VirtualHost no apache.

## Configuração Apache 2 (2.2.22-1ubuntu1.7)


Com o Apache devidamente instalado, crie um arquivo em `/etc/apache2/sites-enable/`
chamado `sige`. Nele copie o seguinte conteúdo, modificando conforme necessidade:

~~~
<VirtualHost *:80>
   ServerName sige.local

   DocumentRoot @@sigedir/public
   <Directory "@@sigedir/public">
      AllowOverride All
   </Directory>
</VirtualHost>
~~~

## Configuração Apache 2 (2.4.7-1ubuntu4.1)

Crie o arquivo `saa.conf` em `/etc/apache2/sites-enabled` com o conteúdo:

~~~
<VirtualHost *:80>
    ServerName sige.local

    DocumentRoot @@sigedir/public

    <Directory @@sigedir/public/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>
~~~

Adicionaremos o `ServerName` ao `/etc/hosts`:

~~~
127.0.0.1       localhost
# adicione a linha abaixo
127.0.0.1       sige.local
~~~

**Obs.:** este trecho deve ser feito apenas em ambiente de desenvolvimento.

Habilite o `mod rewrite` do apache: `$ sudo a2enmod rewrite`.

Reinicie o Apache: `$ sudo service apache2 restart`.

**TODO**: explicar instalação mpdf <http://mpdf1.com/manual/index.php?tid=509>
