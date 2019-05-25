const userInput = `
    input userAuth {
        userEmail : String!
        userPassword : String!
        token: String
    }

    input userUpdate {
        token : String
        userNewEmail : String
        userPassword : String!
        userNewPassword : String
    }
`;

module.exports = userInput;
