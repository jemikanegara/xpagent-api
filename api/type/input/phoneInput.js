const phoneInput = `
    input addPhoneInput {
        phoneNumber: String!
    }

    input updatePhoneInput {
        _id: ID!
        phoneNumber: String!
    }

    input deletePhoneInput {
        _id: ID!
    }
`;

module.exports = phoneInput;
