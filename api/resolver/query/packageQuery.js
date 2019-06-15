const Package = require('../../../models/package')
const Agent = require('../../../models/agent')

exports.getOwnPackage = async (root, req, { decoded }) => {
    const agent = await Agent.findOne({ agentUser: decoded._id }).exec()
    return await Package.find({ packageAgent: agent._id }).sort({ updatedAt: -1 }).skip().limit(10).exec()
}

exports.getSinglePackage = async (root, { _id }) => {
    return await Package.findById(_id).exec()
}