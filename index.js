const express = require('express');
const helmet = require('helmet')
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { config } = require('./config');

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

//Servers
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const user = jwt.verify(token.replace('Bearer ',''), config.authJwtSecret)
        return user;
      } catch (error) {
        throw new Error(error)
      }
    }
  }
});

const authApi = require('./routes/auth');
const usersApi = require('./routes/users');
const materialsApi = require('./routes/materials');
const userMaterialsApi = require('./routes/userMaterials');

//Middleware
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const corsHandler = require('./utils/middleware/corsHandler');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json())
app.use(corsHandler());
app.use(helmet());

//routes
authApi(app);
usersApi(app);
materialsApi(app);
userMaterialsApi(app);

// catch 404 error
app.use(notFoundHandler);

//Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.dbPort, function () {
  const debug = require('debug')('app:server');
  debug(`Listening http://localhost:${config.dbPort}`);
});

server.listen({ port: config.dbPortGql }).then(({ url }) => {
  const debug = require('debug')('app:server');
  debug(`Apollo listening ${url}`);
})
