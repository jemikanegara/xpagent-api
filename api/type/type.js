const { gql } = require("apollo-server-express");
const userOutput = require("./output/userOutput");
const userInput = require("./input/userInput");

// Construct a schema,
const type = gql`
  type Query {
    user(id: ID): userOutput
  }

  type Mutation {
    userRegister(user: userAuth): tokenOutput
    userLogin(user: userAuth): tokenOutput
    userUpdate(user: userUpdate): tokenOutput
  }

  scalar Date

  ${userOutput}
  ${userInput}
`;
module.exports = type;
