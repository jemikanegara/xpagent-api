// Scalar
const Date = require("../type/scalar/Date");

// Query
// const { user } = require("../resolver/query/userQuery");
const { getAgent, searchAgent } = require("../resolver/query/agentQuery");
const { getOwnPackage, getSinglePackage } = require('./query/packageQuery')
const { getInvoice, getInvoices } = require("../resolver/query/invoiceQuery")

// Mutation
const {
  userRegister,
  userLogin,
  userUpdate,
  userEmailCheck,
  tokenCheck
} = require("./mutation/userMutation");
const { createAgent, updateAgent, agentEmailCheck, agentTokenCheck } = require("./mutation/agentMutation");
const {
  createPackage,
  updatePackage,
  deletePackage
} = require("./mutation/packageMutation");
const { addPhone, updatePhone, deletePhone } = require('./mutation/phoneMutation')
const { createOrder,
  deleteOrder,
  checkoutOrder } = require('./mutation/orderMutation')
const { createReview } = require('./mutation/reviewMutation')

const resolver = {
  Date,
  Query: {
    getAgent,
    searchAgent,
    getOwnPackage,
    getSinglePackage,
    getInvoice,
    getInvoices
  },
  Mutation: {
    // User
    userRegister,
    userLogin,
    userUpdate,
    userEmailCheck,
    tokenCheck,

    // Agent
    createAgent,
    updateAgent,
    agentEmailCheck,
    agentTokenCheck,

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
    checkoutOrder,

    // Review
    createReview
  }
};

module.exports = resolver;
