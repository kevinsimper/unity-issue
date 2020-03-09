# Unity Issue

Unity Issue tracker is made with TypeScript, Express.js, Apollo GraphQL server and SQLite.

It is made with GraphQL because that allows it to be easily discoverable and strongly typed.

You can browse, create, update and delete issues.

An issue contains:

- id
- summary
- description
- priority
- status
- assigned

## Folder structure

- backend:

  contains the graphql api
  starts a server on port 9000
  a graphql interface can be found on localhost:9000/graphql

- frontend:

  contains a SPA
  can be exported to static HTML
  starts a dev server on port 3000

## How to Run

- backend:
  - \$ npm install
  - \$ npm build
  - \$ npm start
- frontend:
  - \$ npm install
  - \$ npm start

## Design considerations - backend

Right now the backend uses SQLite which is not favorable when we deploy it. Knex can be switched to use Postgres in production.

A NoSQL backend like MongoDB could have been used, but SQL is prefered to create autoincrementing id's and allows for better reporting. SQL is a super valuable tool but is a bit more complicated in early development as any schema change requires migrations.

GraphQL is a new technology that is different from a REST api. A REST api can be expose from the graphql schema with a npm package called `sofa` if needed.

The backend is implemented with Node.js which is fast but not fast compared to Golang and others which can be static compiled. If later scaling becomes an issue part of the authencation can be rewritten in Golang or similar.

Tradeoffs: Little validation of input was implemented. Only validation is from the GraphQL schema.

### Signup / Login

In the backend there is implemented a simple authentication system.

It uses the same sqlite database to store the users. These users will be connected to the issues a user creates.

Bcrypt is used to hash the password and when a successful login a JSONWebToken is return. THat token can be used to authorize against the backend graphql api by setting it as a bearer token eg. `Authorization: bearer TOKEN`.

Using httpie you can create a user and login in easily:

```
$ http :9000/signup email=example@example.com password=test
```

```
$ http :9000/login email=example@example.com password=test
```

## Design considerations - Frontend

Frontend is implemented with Next.js which is a fast way to create a static website with React.js

It uses Apollo Boost to create a connection to the graphql backend and allows us to use Hooks to manage the state of our SPA. This allows us to manage state really well as the application scales.

Login and Signup is implemented delibrated outside GraphQL as doing it inside GraphQL makes authentication and authorization much more difficult to manage.

Tradeoff: A lot of modules imported which makes the SPA heavy in terms of kilobytes of JS to be downloaded.

## Next things to implement

- Prepare deployment with Dockerfile
- Update createIssue and UpdateIssue to use the id of the authenticated user
- Expose users to the graphql backend
- Allow creating issues in the frontend
- Allow updating issues in the frontend
