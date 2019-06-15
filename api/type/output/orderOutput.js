const orderOutput = `
    type orderOutput {
        _id : ID!
        orderPackage : String!
        orderUser : String!
        orderSchedule : Date!
        orderPassengers: [String!]!
        orderNote: String
        orderCheckoutPackage: packageOutput
        orderDelivered: Boolean!
        orderAmount: Int!
    }
`
module.exports = orderOutput