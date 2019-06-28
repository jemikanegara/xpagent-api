const agentOutput = `
    type agentOutput {
        _id : ID!
        agentName : String!
        agentPhoto : String!
        agentDescription : String!
    }

    type agentTokenOutput {
        valid: Boolean!
        isAgent: Boolean!
    }
`;

module.exports = agentOutput;
