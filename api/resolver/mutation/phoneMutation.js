// Model
const Phone = require('../../../models/phone')
const User = require('../../../models/user')

exports.addPhone = async (root, phoneNumber, { decoded }) => {
    if (!decoded) {
        throw Error('No access')
    }
    const newPhoneNumber = new Phone({
        phoneNumber,
        phoneUser: decoded._id
    })
    return await newPhoneNumber.save()
}

exports.updatePhone = async (root, { phoneNumber }, { decoded }) => {
    if (!decoded) {
        throw Error('No access')
    }
    const findUser = await User.findById(decoded._id)
    if (!findUser) {
        throw Error('No access')
    }
    const updatedPhone = await Phone.findByIdAndUpdate(phoneNumber._id, { phoneNumber })
    return updatedPhone
}

exports.deletePhone = async (root, { phoneNumber }, { decoded }) => {
    if (!decoded) {
        throw Error('No access')
    }
    const findUser = await User.findById(decoded._id)
    if (!findUser) {
        throw Error('No access')
    }
    const updatedPhone = await Phone.findByIdAndDelete(phoneNumber._id, { phoneNumber })
    return updatedPhone
}