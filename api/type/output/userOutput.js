const userOutput = `
    type userOutput {
        _id : ID
        userEmail : String!
        createdAt : Date!
        lastLogin : Date!
    }

    type tokenOutput {
        token: String!
        isAgent: Boolean
    }
`;
module.exports = userOutput;
