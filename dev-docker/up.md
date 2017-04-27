
# Subindo o Ambiente

Para subir o sistema por completo vamos utilizar o [docker-compose](http://docs.docker.com/compose/).
O arquivo que descreve os 3 containers é o `docker-compose.yml` que se encontra no diretório
raiz. Eu disse **3** porque temos ainda um container `nginx`, que está descrito apenas
no `docker-compose.yml`. Isso porque ele não precisa de muitas configurações, apenas
copiar alguns arquivos.

Para iniciar o sistema execute num terminal:

~~~
docker-compose up -d
~~~

Isso fará os 3 containers subirem e irá librerar a linha de comando. Após os passos anteriores
utilize somente o comando acima para subir o sistema.

Para ver os logs basta executar:

~~~
docker-compose logs
~~~

Para parar os serviços:

~~~
docker-compose stop
~~~
