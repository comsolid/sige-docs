# Dicas Docker

O Docker mantém os conteiners até que você explicitamente delete-os. Isto pode ser ruim, caso haja alguma mudança nas imagens dos serviços. Para limpar seu ambiente, siga as instruções a seguir:

## Listando containers

`docker ps`

## Apagando containers

`docker rm <container_ids>`

## Apagando imagens

`docker rmi <image_ids>`

## Limpando containers parados

### Docker &gt;= 1.13

`docker container prune`

### Docker &lt; 1.13

`docker ps --filter "status=exited" | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm`

## Limpando imagens ociosas

`docker rmi $(docker images --filter "dangling=true" -q --no-trunc)`

## Limpando volumes ociosos

`docker volume rm $(docker volume ls -qf dangling=true)`

