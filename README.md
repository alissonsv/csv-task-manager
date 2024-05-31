# CSV-TASK-MANAGER
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Implementação de uma API para realizar o CRUD de tasks, com as seguintes funcionalidades:

- [X] Criação da task
- [X] Listagem das tasks
    - [X] Listagem do total de tasks
    - [X] Listagem com filtro
- [X] Atualização de uma task pelo `id`
- [X] Remoção de uma task pelo `id`
- [X] Marcar pelo `id` uma task como completa
- [X] Realizar a importação de diversas tasks através da leitura de um aquivo CSV

## Como rodar local

### Com Docker compose:
```bash
docker compose up
```

### Com Node.JS:
```bash
npm install
npm run dev
```
