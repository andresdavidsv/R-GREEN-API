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
    type Mutation{
      "Create a User"
      createUser(input: UserInput!): String
    }
`;

module.exports = typeDefs;