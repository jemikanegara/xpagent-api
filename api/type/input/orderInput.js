const orderInput = `
    input createOrderInput {
        orderPackage : String!
        orderPassengers: [String!]!
        orderNote: String
        orderAmount: Int!
    }

    input deleteOrderInput {
        _id : ID!
    }
`
module.exports = orderInput