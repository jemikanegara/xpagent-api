const { gql } = require("apollo-server-express");

// User
const userOutput = require("./output/userOutput");
const userInput = require("./input/userInput");
// Agent
const agentOutput = require("./output/agentOutput");

// Construct a schema,
const type = gql`
  type Query {
    #Get Agent
    searchAgent(agentName: String): agentOutput
    agent(id: ID): agentOutput!
  }

  type Mutation {
    userRegister(user: userAuth): tokenOutput
    userLogin(user: userAuth): tokenOutput
    userUpdate(user: userUpdate): tokenOutput
  }

  scalar Date

  ${userOutput}
  ${userInput}
  ${agentOutput}
`;
module.exports = type;
