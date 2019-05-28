const Agent = require("../../../models/agent");
exports.searchAgent = (root, { agentName }) =>
  Agent.find({ agentName: new RegExp("^" + agentName + "$", "i") })
    .sort({
      agentName: 1
    })
    .limit(10)
    .exec();
exports.getAgent = (root, { id }) => Agent.findById(id);
