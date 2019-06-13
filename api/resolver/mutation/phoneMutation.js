// Model
const Phone = require('../../../models/phone')
const User = require('../../../models/user')

// MUTATION : Add Phone
exports.addPhone = async (root, { phone }, { decoded }) => {

    // CHECK : User
    const findUser = await User.findById(decoded._id)

    // ERROR : Token & User
    if (!decoded || !findUser) throw Error('No access')

    // Instance
    const newPhoneNumber = new Phone({
        phoneNumber: phone.phoneNumber,
        phoneUser: findUser._id
    })

    // DATABASE : Create
    return await newPhoneNumber.save()
}

// MUTATION : Update Phone
exports.updatePhone = async (root, { phone }, { decoded }) => {

    // CHECK : User
    const findUser = await User.findById(decoded._id)

    // CHECK : User vs Phone User
    const isAuthorized = await Phone.findById(phone._id).then(phone => phone.phoneUser.toString() === findUser._id.toString())

    // ERROR : Token & User & Auth
    if (!decoded || !findUser || !isAuthorized) throw Error('No access')

    // DATABASE : Update
    return await Phone.findByIdAndUpdate(phone._id, { phoneNumber: phone.phoneNumber }, { new: true })
}

// MUTATION : Delete Phone
exports.deletePhone = async (root, { phone }, { decoded }) => {

    // CHECK : User
    const findUser = await User.findById(decoded._id)

    // CHECK : Phone vs Phone User
    const isAuthorized = await Phone.findById(phone._id).then(phone => phone.phoneUser.toString() === findUser._id.toString())

    // ERROR : Token & User & Auth
    if (!decoded || !findUser || !isAuthorized) throw Error('No access')

    // DATABASE : Delete
    return await Phone.findByIdAndDelete(phone._id)
}