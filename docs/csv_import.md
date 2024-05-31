# Criação via CSV com Stream

> NOTE: aqui eu fiz de forma diferente, ao invés de ler o arquivo separado e enviar uma request para cada linha, estou lendo direto na rota `POST /tasks/csv`

Para realizar isso, vamos utilizar a lib [csv-parse](https://csv.js.org/), utilizando o exemplo de [iterador async](https://csv.js.org/parse/api/async_iterator/).

Com a lib instalada utilizando o gerenciador de pacotes de sua preferência, crie um arquivo a parte para realizar a leitura do arquivo CSV.

Nesse arquivo, deve ser feito a leitura do CSV e para cada linha, realize uma requisição para a rota `POST - /tasks`, passando os campos necessários.

Recomendação do formato do CSV:

```
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05

```

Recomendação de implementação:

Semelhante ao que fizemos no [stream-http-server.js](https://github.com/rocketseat-education/ignite-nodejs-01-fundamentos-nodejs/blob/main/streams/stream-http-server.js) utilizando o `for await`, também é possível fazer com o `parse` da lib informada acima. (Lembre-se de pular a primeira linha do CSV)
