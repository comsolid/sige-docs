# Subindo o Ambiente

Para subir o sistema por completo vamos utilizar o [docker-compose](http://docs.docker.com/compose/).  
O arquivo que descreve os 3 containers é o `docker-compose.yml` que se encontra no diretório  
raiz. Eu disse **3** porque temos ainda um container `nginx`, que está descrito apenas  
no `docker-compose.yml`. Isso porque ele não precisa de muitas configurações, apenas  
copiar alguns arquivos.

É recomendável sempre manter a [versão do Docker atualizada](https://www.docker.com/community-edition), assim como a do [docker-compose](https://github.com/docker/compose/releases). Além disso, sempre que houver alterações na pasta docker do projeto, é importante remover os containers antigos e refazer o build das imagens antes de iniciar os serviços.

```bash
docker-compose rm -f # remove os containers
docker-compose build # faz build das imagens
```

Para iniciar o sistema execute num terminal:

```
docker-compose up -d
```

Isso fará os 3 containers subirem como serviço - rodando em segundo plano. Após os passos anteriores, utilize somente o comando acima para subir o sistema.

Para ver todos os logs basta executar:

```
docker-compose logs
```

Para parar os todos serviços:

```
docker-compose stop
```



