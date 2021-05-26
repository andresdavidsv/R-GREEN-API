const express = require('express');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

//Servers
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const { config } = require('./config/index');
const usersApi = require('./routes/users');

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

//routes
usersApi(app);

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

server.listen().then(({ url }) => {
  console.log(`Apollo listening ${url}`);
})
