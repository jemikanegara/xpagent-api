const reviewInput = `
    input reviewInput {
        reviewOrder: ID!
        reviewInvoice: ID!
        reviewPackage: ID!
        reviewRating: Int!
        reviewComment: String
    }
`;

module.exports = reviewInput;
