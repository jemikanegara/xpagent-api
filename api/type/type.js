const { gql } = require("apollo-server-express");

// User
const userOutput = require("./output/userOutput");
const userInput = require("./input/userInput");

// Agent
const agentOutput = require("./output/agentOutput");
const agentInput = require("./input/agentInput");

// File
const file = require("./output/file");

// Construct a schema
const type = gql`
  type Query {
    # Agent
    searchAgent(agentName: String): agentOutput
    getAgent(id: ID): agentOutput!
  }

  type Mutation {
    # User
    userRegister(user: userAuth): tokenOutput
    userLogin(user: userAuth): tokenOutput
    userUpdate(user: userUpdate): tokenOutput
    # Agent
    createAgent(agent: agentInput): agentOutput
  }

  # Scalar Declaration
  scalar Date

  # File Type
  ${file}

  # User Types
  ${userOutput}
  ${userInput}

  # Agent Types
  ${agentOutput}
  ${agentInput}
`;
module.exports = type;
