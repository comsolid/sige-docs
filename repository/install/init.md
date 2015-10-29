# Programas necessários

* PostgreSQL;
* Apache HTTP Server;
* php5;
	* extensão intl;
	* extensão GD;

~~~
sudo apt-get install apache2 php5 php5-pgsql libapache2-mod-php5 php5-intl php5-gd
~~~

### PostgreSQL

Para a instalação do PostgreSQL você pode utilizar a versão do repositório, no caso:

~~~
sudo apt-get install postgresql
~~~

Entretanto você pode acabar não usando a última versão e sim a última versão que o
repositório oferece. Para instalar a versão mais atual em qualquer sistema baixe
o PostgreSQL do site <http://www.enterprisedb.com/products-services-training/pgdownload>.

A instalação, por exemplo da versão `9.4.5-1`, é feita da seguinte forma:

~~~
chmod u+x postgresql-9.4.5-1-linux-x64.run
sudo ./postgresql-9.4.5-1-linux-x64.run
~~~

Depois siga as instruções indicadas na tela.

### git (Opcional)

~~~
sudo apt-get install git
~~~
