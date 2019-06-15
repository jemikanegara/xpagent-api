const User = require('../../models/user')
const userCheck = async (decoded) => {
    if (!decoded) throw Error('No access')
    const findUser = await User.findById(decoded._id)
    if (!findUser) throw Error('No access')
    return findUser
}

module.exports = userCheck