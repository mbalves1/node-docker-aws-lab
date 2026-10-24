# Docker AWS Lab

Projeto de estudo para aprender a subir uma API Node.js com Docker e PostgreSQL na AWS.

É uma API simples de cadastro de usuários (nome, email e telefone), organizada em camadas no estilo Clean Architecture.

## Stack

- **Node.js 24** + **TypeScript**
- **Express 5**
- **PostgreSQL 17** (via Docker)
- **Swagger** para documentação da API

## Arquitetura

```
src/
├── domain/                      # regras de negócio (não conhece Express nem banco)
│   ├── entities/User.ts
│   └── repositories/IUserRepository.ts   # interface do repositório
├── application/use-cases/       # um caso de uso por ação
│   ├── CreateUserUseCase.ts
│   ├── GetUsersUseCase.ts
│   └── DeleteUserUseCase.ts
├── infra/                       # detalhes técnicos
│   ├── database/connection.ts   # conexão com o PostgreSQL
│   └── repositories/UserRepository.ts    # queries SQL
├── presentation/                # camada HTTP
│   ├── controllers/UserController.ts
│   ├── routes/userRoutes.ts
│   └── docs/swagger.ts
└── main/
    ├── factories/userFactory.ts # monta as dependências
    └── server.ts                # sobe o servidor
```

O fluxo de uma requisição é:

```
rota → controller → use case → repository → PostgreSQL
```

A **factory** é o único lugar que cria as classes e liga uma na outra. Os use cases dependem só da interface `IUserRepository`, então trocar o banco não exige mexer neles.

## Pré-requisitos

- [Node.js 24+](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/) com Docker Compose

## Como rodar

```bash
# 1. instalar as dependências
npm install

# 2. criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. subir o banco
npm run db:up

# 4. subir a API
npm run dev
```

A API sobe em `http://localhost:3000` (ou na `PORT` definida no `.env`).

Na primeira vez que o banco sobe, o arquivo [database/init.sql](database/init.sql) cria a tabela `users` automaticamente.

### Rodando tudo no Docker (API + banco)

É assim que o projeto roda no servidor. Não precisa ter Node instalado, só Docker:

```bash
cp .env.example .env   # ajuste a senha do banco
npm run docker:up      # ou: docker compose up -d --build
```

O [Dockerfile](Dockerfile) compila o TypeScript numa etapa e gera uma imagem final só com o `dist/` e as dependências de produção.

Dentro do Docker, a API acessa o banco pelo nome do serviço (`db`), não por `localhost`. Por isso o `docker-compose.yml` sobrescreve o `DB_HOST`.

A API no Docker e o `npm run dev` usam a mesma porta. Rode um de cada vez, ou pare a API do Docker com `docker compose stop api`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Roda em desenvolvimento, reiniciando a cada alteração |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm start` | Roda a versão compilada (`dist/`). É o comando usado em produção |
| `npm run typecheck` | Verifica os tipos sem gerar arquivos |
| `npm run db:up` | Sobe só o container do PostgreSQL (para usar com `npm run dev`) |
| `npm run docker:up` | Faz o build da imagem e sobe API + banco no Docker |
| `npm run docker:logs` | Mostra os logs da API no Docker |
| `npm run db:down` | Derruba todos os containers (os dados continuam salvos no volume) |

Para apagar o banco e recriar do zero (ex.: depois de alterar o `init.sql`):

```bash
docker compose down -v
npm run db:up
```

## Endpoints

| Método | Rota | Descrição | Respostas |
|---|---|---|---|
| `POST` | `/users` | Cadastra um usuário | `201`, `400` |
| `GET` | `/users` | Lista os usuários | `200` |
| `DELETE` | `/users/:id` | Remove um usuário | `204`, `400` |

Exemplo de body do `POST /users`:

```json
{
  "name": "Murilo",
  "email": "murilo@email.com",
  "phone": "11999999999"
}
```

## Documentação (Swagger)

Com a API rodando, acesse:

```
http://localhost:3000/docs
```

Por lá dá para ver e testar todas as rotas pelo navegador.

## Testando com curl

O script [curl.sh](curl.sh) cria um usuário, lista e deleta o usuário criado:

```bash
./curl.sh

# apontando para outro endereço (ex.: servidor na AWS)
BASE_URL=http://IP-DO-SERVIDOR:3000 ./curl.sh
```

O script usa `http://localhost:3000` como padrão. Se a sua API estiver em outra porta, passe o `BASE_URL`.

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta da API | `3000` |
| `DB_HOST` | Endereço do PostgreSQL | `localhost` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `DB_NAME` | Nome do banco | `app` |

Localmente elas vêm do arquivo `.env`. No Docker ou na AWS, elas são definidas no próprio container. O `.env` não vai para o Git.

## Problemas comuns

**`connect ECONNREFUSED 127.0.0.1:5432`**: o banco não está rodando, ou o `DB_PORT` do `.env` não bate com a porta do `docker-compose.yml`. Rode `npm run db:up` e confira com `docker compose ps`.

**`client password must be a string`**: as variáveis do `.env` não foram carregadas. Confira se o arquivo `.env` existe e se a API foi iniciada com `npm run dev` ou `npm start`, e não com `node` direto.

**`port is already allocated`**: outro programa ou container já está usando a porta. Pare o outro serviço ou troque a porta no `docker-compose.yml` e no `.env`.

## Próximos passos

- [x] `Dockerfile` da API
- [x] API e banco juntos no `docker-compose.yml`
- [ ] Deploy na AWS (EC2 ou ECS + RDS)
