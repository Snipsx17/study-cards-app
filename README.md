# Study cards app

This application is designed for people who are learning or studying something new, it allows you to create flash cards which are grouped by topics.

## Run Locally

This project is created as a monorepo with PNPM, we have 2 folders, one for the **Frontend** and one for the **backend**, for each of them we must create the respective environment variables

Clone the project

```bash
  git clone https://github.com/Snipsx17/study-cards-app
```

Go to the project directory

```bash
  cd study-cards-app
```

Install dependencies

```bash
  pnpm install
```

_This will install dependencies to entire project_

Go to backend folder and create .env file

```bash
  cd backend
  cp env_example .env
```

create the next variables

- ENVIRONMENT = app modality
- SERVER_PORT = server port
- DEFAULT_AVATAR_IMG = url
- SALT_ROUND = number of salt rounds for password encryption
- JWT_SECRET = secret
- JWT_REFRESH_TOKEN_EXPIRATION = expiration time e.g 15d
- CORS_ORIGIN = url
- AWS_ACCESS_KEY_ID = aws key
- AWS_SECRET_ACCESS_KEY = aws secret
- AWS_REGION = default region
- DATABASE_URL = db url

Migrate DB with prisma

```bash
  pnpm prisma migrate dev --name init
```

_This will create DB structure_

Go to frontend folder and create .env file

```bash
  cd ../frontend
  cp env_example .env
```

create the next variables

- NEXT_PUBLIC_API_BASE_URL = api url by default http://localhost:${PORT}/api/v1/

_**PORT** was defined on backend as **SERVER_PORT**_

Go to the main project directory

```bash
  cd ../
```

Start the servers

```bash
  pnpm run frontend:dev
  pnpm run backend:dev
```
