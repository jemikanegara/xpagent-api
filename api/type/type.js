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

// Order
const orderOutput = require("./output/orderOutput")
const orderInput = require("./input/orderInput")

// Invoice
const invoiceOutput = require("./output/invoiceOutput")
const invoiceInput = require("./input/invoiceInput")

// Review
const reviewOutput = require('./output/reviewOutput')
const reviewInput = require('./input/reviewInput')

// Construct a schema
const type = gql`
  type Query {
    # Agent
    searchAgent(agentName: String!): agentOutput!
    getAgent(id: ID): agentOutput!
    # Package
    getOwnPackage: [packageOutput!]!
    getSinglePackage(id: String!): packageOutput!
    searchPackage(packageName: String!): [packageOutput!]!
    newPackage: [packageOutput!]!
    # Order
    getOrders: [orderOutput]!
    getOrder(id: String!): orderOutput!
    # Invoice 
    getInvoices: [invoiceOutput]!
    getInvoice(invoice: invoiceInput!): invoiceOutput!
  }

  type Mutation {
    # User
    userRegister(user: userAuth!): tokenOutput!
    userLogin(user: userAuth!): tokenOutput!
    userUpdate(user: userUpdate!): tokenOutput!
    userEmailCheck(email: String!): Boolean!
    tokenCheck(token: String!): Boolean!
    # Agent
    createAgent(agent: agentInput): agentOutput!
    updateAgent(agent: agentInput): agentOutput!
    agentEmailCheck(email: String!): Boolean!
    agentTokenCheck(token: String!): agentTokenOutput!
    # Package
    createPackage(tourPackage: createPackageInput!): packageOutput!
    updatePackage(tourPackage: updatePackageInput!): packageOutput!
    deletePackage(tourPackage: deletePackageInput!): packageOutput!
    # Phone
    addPhone(phone: addPhoneInput!): phoneOutput!
    updatePhone(phone: updatePhoneInput!): phoneOutput!
    deletePhone(phone: deletePhoneInput!): phoneOutput!
    # Order
    createOrder(order: createOrderInput) : orderOutput!
    deleteOrder(order: deleteOrderInput) : orderOutput!
    checkoutOrder(orders: [deleteOrderInput]) : invoiceOutput!
    # Review
    createReview(review: reviewInput!) : reviewOutput!
  }

  # Scalar Declaration
  scalar Date

  # File Type
  ${file}

  # User Types
  ${userOutput}
  ${userInput}

  # Phone Types
  ${phoneOutput}
  ${phoneInput}

  # Agent Types
  ${agentOutput}
  ${agentInput}

  # Package Types
  ${packageOutput}
  ${packageInput}

  # Order Types
  ${orderOutput}
  ${orderInput}

  # Invoice Types
  ${invoiceOutput}
  ${invoiceInput}

  # Review Types
  ${reviewOutput},
  ${reviewInput}
`;
module.exports = type;
