const agentInput = `
    input agentInput {
        agentName : String!
        agentPhoto : Upload!
        agentDescription : String!
    }

    input agentUpdateInput{
        agentName : String
        agentPhoto : Upload
        agentDescription : String
    }
`;

module.exports = agentInput;
