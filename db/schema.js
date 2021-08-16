const { gql } = require('apollo-server');

const typeDefs = gql`
    type Material{
      id: ID
      type_name: String!
      weight: String!
    }
    type Token {
      token: String
    }
    type UserMaterial {
      userId: ID
      materialId: ID
    }
    type Query{
      getUserMaterials: [UserMaterial]
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
    input MaterialInput {
      type_name: String!
      weight: String!
    }
    type Mutation{
      "Create a User"
      createUser(user: UserInput!): String
      "Authenticate a User"
      authenticateUser(user: AuthenticateInput!): Token
      "New Material"
      newMaterial(material: MaterialInput): String
      "Update Material"
      updateMaterial(userMaterialId: ID! , material: MaterialInput): String
      "Delete Material"
      deleteMaterial(userMaterialId: ID!): String
    }
`;

module.exports = typeDefs;