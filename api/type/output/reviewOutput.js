const reviewOutput = `
    type reviewOutput {
        _id : ID!
        reviewOrder : orderOutput!
        reviewPackage : packageOutput!
        reviewInvoice : invoiceOutput!
        reviewRating : Int!
        reviewComment : String
    }
`
module.exports = reviewOutput