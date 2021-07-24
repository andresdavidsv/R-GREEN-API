// const UsersService = require('../services/users');

// const usersService = new UsersService();

const resolvers = {
  Query: {

  },
  Mutation: {
    createUser: async (_,{input},ctx) => {
      // const {email, password} = input
      // const existUser = await usersService.createUser({ input });;
      console.log(input,ctx);
    }
  }
};

module.exports = resolvers;