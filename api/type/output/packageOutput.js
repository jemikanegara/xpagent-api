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

    type deleteMultiPackageOutput {
        n: Int!
        ok: Int!
        deletedCount: Int!
    }

    type image {
        original: String!
        clientThumbnail: String!
        agentThumbnail : String!
        uploadPreview : String!
    }
`;

module.exports = packageOutput;
