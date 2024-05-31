# CSV-TASK-MANAGER
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Implementação de uma API para realizar o CRUD de tasks, com as seguintes funcionalidades:

- [X] Criação da task
    - `POST /tasks`
- [X] Criação de diversas tasks através da leitura de um aquivo CSV
    - `POST /tasks/csv`
- [X] Listagem das tasks
    - [X] Listagem do total de tasks
        - `GET /tasks`
    - [X] Listagem com filtro
        - `GET /tasks?title=foo&description=bar`
- [X] Atualização de uma task pelo `id`
    - `PUT /tasks/:id`
- [X] Remoção de uma task pelo `id`
    - `DELETE /tasks/:id`
- [X] Marcar pelo `id` uma task como completa
    - `PATCH /tasks/:id`

[Mais detalhes aqui](./docs/details.md)

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
