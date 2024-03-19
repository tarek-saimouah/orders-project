# NEST JS, PRIMSA, POSTGRES, SWAGGER EXAMPLE

Nest JS REST API sample project with swagger documentation.<br/>
The repository is a basic nestjs app (users, products, orders) with swagger and prisma.<br/>
This project is presented for an article I wrote on <strong>Medium</strong>, providing a tutorial about a clean and reusable solution for implementing sorting params in a GET API endpoint using NestJS, Prisma and Swagger, utilizing the custom decorators feature.<br/>

- [Full article on Medium](https://medium.com/@tareksaimouah/implementing-sorting-params-with-nestjs-prisma-and-swagger-a9837e5bc8e5)

## Tech Stack

- Node js (16^)
- Nest JS (10^)
- posgtres (15^)

## Main Features

- Filtering
- Sorting (with deorators)
- Database seed
- Env validation

## How to use

- clone project
- create .env file in the root directory and fill this environment variable (Postgres connection string ex: 'postgresql://user:password@localhost:5432/db_name?schema=public'):

  - DATABASE_URL

- run:

```bash
$ npm install
$ npx prisma db seed
$ npm run start:dev
```

- head to http://localhost:3000/api-docs to see the swagger docs.
