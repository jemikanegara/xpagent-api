// Scalar
const Date = require("../type/scalar/Date");

// Query
const { user } = require("../resolver/query/userQuery");

// Mutation
const {
  userRegister,
  userLogin,
  userUpdate
} = require("../resolver/mutation/userMutation");

// const Driver = require("../../models/driver")
// const Phone = require("../../models/phone")
// const Package = require("../../models/package")
// const Order = require("../../models/order")
// const Invoice = require("../../models/invoice")
// const Schedule = require("../../models/booking")

const resolver = {
  Date,
  Query: {
    user
  },
  Mutation: {
    userRegister,
    userLogin,
    userUpdate
  }
};

module.exports = resolver;
