const packageOutput = `
    type packageOutput {
        _id : ID!
        packageName : String!
        packagePrice: Int!
        packageAgent: agentOutput!
        packageDescription: String!
        packageImages: [String!]!
        packageDuration: Int!
        packageCustomer: Int!
    }
`;

module.exports = packageOutput;
