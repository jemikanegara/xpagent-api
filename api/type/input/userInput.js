const userInput = `
    input userAuth {
        userEmail : String!
        userPassword : String!
        isAgent: Boolean
    }

    input userUpdate {
        token : String
        userNewEmail : String
        userPassword : String!
        userNewPassword : String
    }
`;

module.exports = userInput;
