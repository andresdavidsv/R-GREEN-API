const { gql } = require('apollo-server');

const typeDefs = gql`
    type Course{
      titulo: String
    }
    type Tecnology{
      tecnologia: String
    }
    type Query{
      getCourses: [Course]
      getTecnologies: [Tecnology]
    }
    input UserInput {
      first_name: String!
      last_name: String!
      user_name: String!
      email: String!
      password: String!
    }
    input AuthenticateInput {
      email: String!
      password: String!
    }
    type Token {
      token: String
    }
    type Mutation{
      "Create a User"
      createUser(user: UserInput!): String
      "Authenticate a User"
      authenticateUser(user: AuthenticateInput!): Token
    }
`;

module.exports = typeDefs;