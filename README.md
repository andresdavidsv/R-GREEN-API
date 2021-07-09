# R-GREEN API

## Endpoints

GET ALL USERS http://localhost:3001/api/v1/users

```
{
  success: true,
  data:[{
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
  }]
}
```

GET USER http://localhost:3001/api/v1/users/:id

```
{
  success: true,
  data:[{
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
  }]
}
```

POST USER http://localhost:3001/api/v1/users/

```
{
  success: true,
  data:[{
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
  }]
}
```

PUT USER http://localhost:3001/api/v1/users/:id

```
{
  success: true,
  data:[{
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
  }]
}
```

PUT USER http://localhost:3001/api/v1/users/:id

```
{
  "data": userId,
  "message": "user deleted"
}
```

## Deploy

URL => https://r-green-api.vercel.app/

## Dependences Instaled

- npm i express dotenv
- npm i -D nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier
- Hook => npx mrm lint-stage
- MongoDb = > npm i mongodb
- Boom => npm i @hapi/boom
- Joi => npm i @hapi/joi
- Cors => npm i cors
- Deploy => npm i -g vercel

## Docker Instaled
- Build => docker build -t r-green-api .
- Run Image => docker run -p 3001:3001 -d r-green-api
