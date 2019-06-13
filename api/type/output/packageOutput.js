const packageOutput = `
    type packageOutput {
        _id : ID!
        packageName : String!
        packagePrice: Int!
        packageAgent: String!
        packageDescription: String!
        packageImage: String!
        packageDuration: Int!
        packageCustomer: Int!
    }
`;

module.exports = packageOutput;
