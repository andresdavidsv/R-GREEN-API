const bcrypt = require('bcrypt');
const UserService = require('../services/users');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');

const { config } = require('../config');

const usersService = new UserService();
const apiKeysService = new ApiKeysService();

const createToekn = (user, apiKey) => {

  const { _id: id, first_name, last_name, user_name, email } = user;

  const payload = {
    sub: id,
    first_name,
    last_name,
    user_name,
    email,
    scopes: apiKey.scopes
  };

  return jwt.sign(payload, config.authJwtSecret, {
    expiresIn: '15m'
  });
}

const resolvers = {
  Query: {

  },
  Mutation: {
    createUser: async (_, { user }) => {

      const { email, password, first_name, last_name, user_name } = user;

      // eslint-disable-next-line no-useless-escape
      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const isValidEmail = emailExpression.test(String(email).toLowerCase())

      if (!isValidEmail)
        throw new Error("email not in proper format")

      if (first_name.length > 15 || first_name.length < 5)
        throw new Error("firstName should less than 15 characters and more than 5 characters")

      if (last_name.length > 15 || last_name.length < 5)
        throw new Error("lastName should less than 15 characters and more than 1 characters")

      if (user_name.length > 10 || user_name.length < 3)
        throw new Error("userName should less than 15 characters and more than 3 characters")

      if (password.length > 30 || password.length < 3)
        throw new Error("password should less than 30 characters and more than 3 characters")

      const userExists = await usersService.getUser(user);
      const userNameExists = await usersService.getUserName(user);

      if (userExists || userNameExists)
        throw new Error('user already exists.')

      const createdUserId = await usersService.createUser({ user });

      return (`user created ${createdUserId}`);
    },
    authenticateUser: async (_, { user }) => {

      const { email, password } = user;

      // eslint-disable-next-line no-useless-escape
      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const isValidEmail = emailExpression.test(String(email).toLowerCase())

      if (!isValidEmail)
        throw new Error("email not in proper format")

      if (password.length > 30 || password.length < 3)
        throw new Error("password should less than 30 characters and more than 3 characters")

      const userExists = await usersService.getUser(user);

      if (!userExists)
        throw new Error('credentials incorrect')

      const correctPassword = await bcrypt.compare(password, userExists.password)

      if (!correctPassword)
        throw new Error('credentials incorrect')

      const apiKey = await apiKeysService.getApiKey({ token: config.publicApiKeyToken });

      return {
        token: createToekn(userExists, apiKey),
      };
    }
  }
};

module.exports = resolvers;