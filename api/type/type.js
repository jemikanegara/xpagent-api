const { gql } = require("apollo-server-express");

// File
const file = require("./output/file");

// User
const userOutput = require("./output/userOutput");
const userInput = require("./input/userInput");

// Agent
const agentOutput = require("./output/agentOutput");
const agentInput = require("./input/agentInput");

// Package
const packageOutput = require("./output/packageOutput");
const packageInput = require("./input/packageInput");

// Phone
const phoneOutput = require("./output/phoneOutput");
const phoneInput = require("./input/phoneInput");

// Construct a schema
const type = gql`
  type Query {
    # Agent
    searchAgent(agentName: String!): agentOutput!
    getAgent(id: ID): agentOutput!
    # Package
    searchPackage(packageName: String!): packageOutput!
    newPackage: [packageOutput!]!
  }

  type Mutation {
    # User
    userRegister(user: userAuth!): tokenOutput!
    userLogin(user: userAuth!): tokenOutput!
    userUpdate(user: userUpdate!): tokenOutput!
    # Agent
    createAgent(agent: agentInput): agentOutput!
    updateAgent(agent: agentInput): agentOutput!
    # Package
    createPackage(tourPackage: createPackageInput!): packageOutput!
    updatePackage(tourPackage: updatePackageInput!): packageOutput!
    deletePackage(tourPackage: deletePackageInput!): packageOutput!
    # Phone
    addPhone(phone: Int!): phoneOutput!
    updatePhone(phone: phoneInput!): phoneOutput!
    deletePhone(phone: phoneInput!): phoneOutput!
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

  # Package Types
  ${packageOutput}
  ${packageInput}

  # Phone Types
  ${phoneOutput}
  ${phoneInput}
`;
module.exports = type;
