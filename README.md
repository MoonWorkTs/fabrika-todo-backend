
# Fabrika TODO 

Task sheet server application


## Get Start


First of all, we create a **.env file** in the root of the project and enter the following variables into it:

| Variable | Description                |
| :-------- | :------------------------- |
| APP_PORT |  application port (example: 8082) |
| POSTGRES_USER | database username (default: `postgres`) |
| POSTGRES_PASSWORD |  database password (default: `postgres` |
| POSTGRES_DATABASE |  database name (default: `fabrika-todo-db`) |
| POSTGRES_URL | `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DATABASE}?schema=public` |

The next step is to install the dependencies:

```bash
  npm install
```

Let's run the command next:

```bash
  docker compose up -d
```

Generate prisma/client:
```bash
  npx prisma generate
```

Run application:

```bash
  npm start
```


## API Reference

#### Create task

```http
  POST /tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Task name |

#### Get all tasks

```http
  GET /tasks
```

#### Toggle completed task

```http
  PATCH /tasks/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Task Id |


