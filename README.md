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

## Signup / Login

Using httpie you can create a user and login in easily:

```
$ http :9000/signup email=example@example.com password=test
```

```
$ http :9000/login email=example@example.com password=test
```
