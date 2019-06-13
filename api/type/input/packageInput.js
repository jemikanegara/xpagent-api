const packageInput = `
    input createPackageInput {
        packageName : String!
        packagePrice: Int!
        packageDescription: String!
        packageImage: Upload!
        packageDuration: Int!
        packageCustomer: Int!
    }

    input updatePackageInput {
        _id : ID!
        packageName : String
        packagePrice: Int
        packageDescription: String
        packageImage: Upload
        packageDuration: Int
        packageCustomer: Int
    }

    input deletePackageInput {
        _id : ID
    }
`;

module.exports = packageInput;
