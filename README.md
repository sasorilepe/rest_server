# Node.js Rest API

## Testing

Install all dependencies

```
npm install
```

Run the project

```
npm start
```

## Get All Users

Request:

```
HTTP 1.1
GET /v1/users/
```

Response:

```
HTTP 1.1
200 Ok

{
  ok: true,
  results: [{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 21
  }, {
    id: 2,
    firstName: 'Jenny',
    lastName: 'Doe',
    age: 21
  }]
}
```

## Get one user by id

Request:

```
HTTP 1.1
GET /v1/users/1
```

Response:

```
HTTP 1.1
200 Ok

{
  ok: true,
  result: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 21
  }
}
```

## Create a user

Request:

```
HTTP 1.1
POST /users

{
  firstName: 'Jonny',
  lastName: 'Doe',
  age: 22
}
```

Response:

```
HTTP 1.1
201 Created

{
  ok: true,
  result: {
    id: 3,
    firstName: 'Jonny',
    lastName: 'Doe',
    age: 22
  }
}
```

Constraints:

- age is mandatory and must be greater or equal than zero
- first name is mandatory and must be a non-empty string
- last name is mandatory and must be a non-empty string

Invalid Request:

```
HTTP 1.1
POST /v1/users/

{
  age: -1,
  firstName: 10,
  lastName: 10
}
```

Invalid Response:

```
400 Bad Request

{
  ok: false,
  errors: [{
    field: 'firstName',
    message: 'Must be a non-empty string'
  }, {
    field: 'lastName',
    message: 'Must be a non-empty string'
  }, {
    field: 'age',
    message: 'Must be a positive number or zero'
  }]
}
```

## Update a user by id

Request:

```
HTTP 1.1
PUT /v1/users/1

{
  firstName: 'Connor',
  lastName: 'McGreggor',
  age: 30
}
```

Response:

```
HTTP 1.1
200 Ok

{
  ok: true,
  result: {
    id: 1,
    firstName: 'Connor',
    lastName: 'McGreggor',
    age: 30,
  }
}
```

Contraints:

- age is mandatory and must be greater or equal than zero
- first name is mandatory and must be a non-empty string
- last name is mandatory and must be a non-empty string

## Delete user by id

Request:

```
HTTP 1.1
DELETE /v1/users/1
```

Response:

```
HTTP 1.1
204 No Content
```

