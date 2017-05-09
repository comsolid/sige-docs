# Configurando o SiGE

Precisamos apenas configurar o endereço \(_host_\) do banco de dados. Quando usamos  
o `docker-compose` internamente ele cria os endereços com o mesmo nome da _label_  
do container.

Nesse caso precisamos alterar o endereço do PostgreSQL descrito no arquivo  
`./application/configs/application.ini` na seção `[development : production]`.  
Edite o arquivo da seguinte maneira, troque de:

```
resources.db.params.host = "localhost"
```

Para

```
resources.db.params.host = "pg"
```

Esse endereço `pg` pode ser visto no arquivo `./docker-compose.yml`:

```
pg:
  image: sige/pg
```

Em seguida adicione uma linha em seu arquivo `/etc/hosts` inicando o endereço e o IP  
do container.

O endereço IP pode ser obtido através do comando `ifconfig`ou `ip a`. Procure por `docker0`, ou  
algo assim.

Em seguida edite o arquivo `/etc/hosts` adicionando ao final a linha:

```
172.17.42.1    sige.dev
```

Troque o endereço `172.17.42.1` pelo IP que você encontrou \(pode ser o mesmo\).

Esse endereço `sige.dev` está definido no arquivo `./docker/nginx/vhost.conf`.

Por fim abra o seu browser usando o endereço `http://sige.dev:8080`

