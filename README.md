## Description

This is A solution for a case study of creating an api around A rental Film Database using Nest.js

## Project setup

1. Create a .env file in the root of your project containing the following env Variables

```
POSTGRES_DB="docker-nest-postgres"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
DATABASE_URL="postgresql://postgres:password@postgres:5432/postgres?schema=public&connect_timeout=300"
```

2. Start the project

```bash
$ docker compose up --build
```

3. Run the migrations

```
docker exec -it film-rental-api-1 npx prisma migrate dev
```

4. Load the data

```
./load_data.sh
```

## Api Docuementation

- For the documentation of the API there is a postman file including the endpoints.
