const invoiceOutput = `
    type invoiceOutput {
        _id : ID!
        invoiceOrders : [orderOutput!]!
        invoicePaid : Boolean!
        invoiceAmount : Int!
        invoicePaymentMethod : String!
        invoiceContact : [String!]!
    }
`
module.exports = invoiceOutput
