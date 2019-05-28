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
const { createAgent } = require("./mutation/agentMutation");

// const Driver = require("../../models/driver")
// const Phone = require("../../models/phone")
// const Package = require("../../models/package")
// const Order = require("../../models/order")
// const Invoice = require("../../models/invoice")
// const Schedule = require("../../models/booking")

const resolver = {
  Date,
  Query: {
    getAgent,
    searchAgent
  },
  Mutation: {
    userRegister,
    userLogin,
    userUpdate,
    createAgent
  }
};

module.exports = resolver;
