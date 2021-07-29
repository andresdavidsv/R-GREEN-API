# R-GREEN API

## Endpoints

### User

GET ALL USERS http://localhost:3001/api/v1/users

```
{
  success: true,
  data:[{
    "_id": userId,
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
    "isAdmin": ''
  }],
  message: 'users listed'
}
```

GET USER http://localhost:3001/api/v1/users/:id

```
{
  success: true,
  data:{
    "_id": userId,
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
    "isAdmin":''
  },
  'message': 'user retrieved'
}
```

POST USER http://localhost:3001/api/v1/users/

```
{
  success: true,
  data: userId,
  message: 'user created'
}
```

PUT USER http://localhost:3001/api/v1/users/:id

```
{
  success: true,
  data: userId,
  message: 'user updated'
}
```

DELETE USER http://localhost:3001/api/v1/users/:id

```
{
  data: userId,
  message: 'user deleted'
}
```

### Materials

GET ALL MATERIALS http://localhost:3001/api/v1/materials

```
{
  success: true,
  data:[{
    "_id": materialId,
    type_name: '',
    wieght: '',
  }],
  message: 'materials listed'
}
```

GET MATERIAL http://localhost:3001/api/v1/materials/:id

```
{
  success: true,
  data:{
    "_id": materialId,
    type_name: '',
    wieght: '',
  },
  'message': 'material retrieved'
}
```

POST MATERIAL http://localhost:3001/api/v1/materials/

```
{
  success: true,
  data: materialId,
  message: 'user created'
}
```

PUT MATERIAL http://localhost:3001/api/v1/materials/:id

```
{
  success: true,
  data: materialId
  message: 'user updated'
}
```

DELETE MATERIAL http://localhost:3001/api/v1/materials/:id

```
{
  data: materialId,
  message: "material deleted"
}
```

### User's Materials

GET ALL USER'S MATERIALS http://localhost:3001/api/v1/user-materials

```
{
  success: true,
  data:[{
    "_id": userMaterialId,
    userId: '',
    materialId: '',
  }],
  message: 'user materials listed'
}
```

GET USER'S MATERIAL http://localhost:3001/api/v1/user-materials/:id

```
{
  success: true,
  data:{
    "_id": userMaterialId,
    "userId": '',
    "materialId": ''
  },
  message: 'user material retrieved'
}
```

POST USER'S MATERIAL http://localhost:3001/api/v1/user-materials/

```
{
  success: true,
  data: userMaterialId,
  message: 'user material created'
}
```

PUT USER'S MATERIAL http://localhost:3001/api/v1/user-materials/:id

```
{
  success: true,
  data: userMaterialId
  message: 'user material updated'
}
}
```

DELETE USER'S MATERIAL http://localhost:3001/api/v1/user-materials/:id

```
{
  data: user-materialsId,
  message: 'user-materials deleted'
}
```

## Deploy

URL => https://r-green-api.vercel.app/

## Step to Deplou

  1. Before deploying we can test the app with ``` vercel dev ```
  2. If all goes well, we do the deployment: ``` vercel ```

## Dependences Instaled

- npm i express dotenv
- npm i -D nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier
- Hook => npx mrm lint-stage
- MongoDb = > npm i mongodb
- Boom => npm i @hapi/boom
- Joi => npm i @hapi/joi
- Cors => npm i cors
- Deploy => npm i -g vercel
- Passport Js => npm i passport jsonwebtoken passport-http passport-jwt
- Chalk => npm i -D chalk
- Bcrypt => npm i bcrypt
- Apollo Server => npm i apollo-server
- Graphql => npm i graphql graphql-tools
- Helmet => npm i graphql helmet

## Docker Instaled
- Build => docker build -t r-green-api .
- Run Image => docker run -p 3001:3001 -d r-green-api
