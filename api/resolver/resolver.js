// Scalar
const Date = require("../type/scalar/Date");

// Query
// const { user } = require("../resolver/query/userQuery");
const { getAgent, searchAgent } = require("../resolver/query/agentQuery");

// Mutation
const {
  userRegister,
  userLogin,
  userUpdate
} = require("./mutation/userMutation");
const { createAgent, updateAgent } = require("./mutation/agentMutation");
const {
  createPackage,
  updatePackage,
  deletePackage
} = require("./mutation/packageMutation");
const { addPhone, updatePhone, deletePhone } = require('./mutation/phoneMutation')
const { getOwnPackage } = require('./query/packageQuery')
const { createOrder,
  deleteOrder,
  checkoutOrder } = require('./mutation/orderMutation')

const resolver = {
  Date,
  Query: {
    getAgent,
    searchAgent,
    getOwnPackage
  },
  Mutation: {
    // User
    userRegister,
    userLogin,
    userUpdate,

    // Agent
    createAgent,
    updateAgent,

    // Package
    createPackage,
    updatePackage,
    deletePackage,

    // Phone
    addPhone,
    updatePhone,
    deletePhone,

    // Order
    createOrder,
    deleteOrder,
    checkoutOrder
  }
};

module.exports = resolver;
