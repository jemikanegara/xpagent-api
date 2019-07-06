const Agent = require("../../../models/agent");
exports.searchAgent = async (root, { agentName }) =>
  await Agent.find({ agentName: new RegExp("^" + agentName + "$", "i") })
    .sort({
      agentName: 1
    })
    .limit(10)
    .exec();

exports.getAgent = async (root, { id }) => await Agent.findById(id);

exports.getOwnAgent = async (root, args, { decoded }) => {
  if (!decoded._id) throw Error('No Access')
  const agentProfile = await Agent.findOne({ agentUser: decoded._id }).exec()
  if (!agentProfile) throw Error('No Profile')
  return agentProfile
}