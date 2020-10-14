# Build PHP 5.6 FPM

Como o SiGE usa PHP como linguagem principal, preparamos um container PHP com  
suporte a FPM, pois ele será usado com o [Nginx](http://nginx.org/).

Use o arquivo `Dockerfile` que se encontra na pasta `./docker/php`. Utilize o docker-compose para fazer o build:

```text
docker-compose build php
```

