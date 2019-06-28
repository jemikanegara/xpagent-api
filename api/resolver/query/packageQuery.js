const Package = require('../../../models/package')
const Agent = require('../../../models/agent')
const Review = require('../../../models/review')

exports.getPackages = async () => {
    const packages = await Package.find({})
}

exports.getOwnPackage = async (root, args, { decoded }) => {
    const agent = await Agent.findOne({ agentUser: decoded._id }).exec()
    return await Package.find({ packageAgent: agent._id }).sort({ updatedAt: -1 }).skip().limit(10).exec()
}

exports.getSinglePackage = async (root, { id }) => {
    const package = await Package.findById(id).populate('packageAgent').exec()
    return await package
}