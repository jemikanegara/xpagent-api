const mongoose = require('mongoose')
const userCheck = require('../../helpers/userCheck')
const Phone = require('../../../models/phone')
const Package = require('../../../models/package')
const Order = require('../../../models/order')
const Invoice = require("../../../models/invoice")

exports.createOrder = async (root, { order }, { decoded }) => {
    const user = await userCheck(decoded)
    if (!user) throw Error("No access")
    const { orderPackage, orderSchedule, orderPassengers, orderNote, orderAmount } = order
    const newOrder = new Order({
        orderPackage,
        orderUser: decoded._id,
        orderSchedule,
        orderPassengers,
        orderNote,
        orderAmount
    })
    return await newOrder.save()
}

exports.deleteOrder = async (root, { order }, { decoded }) => {
    // CHECK : Auth
    const user = await userCheck(decoded)
    // CHECK : TOKEN ID vs Order User
    const orderByUser = await Order.findById(order._id, { orderUser: user._id })
    // ERROR : User ID
    if (!orderByUser) throw Error("No access")
    // DATABASE : delete
    return await Order.findByIdAndDelete(order._id)
}

exports.checkoutOrder = async (root, { orders }, { decoded }) => {
    // GENERATE : Invoice Orders
    const orderIds = orders.slice().map(order => mongoose.Types.ObjectId(order._id))
    // CHECK : Auth
    const user = await userCheck(decoded)
    // DATABASE : find orders (by ID + userId + not checked out)
    const getOrders = await Order.find({ _id: { $in: orderIds }, orderUser: user._id, orderCheckoutPackage: null }).exec()
    // ERROR
    if (getOrders.length !== orders.length) throw Error("No access")

    // DATABASE : update ORDER
    // Copying checked out package information
    const insertOrderCheckoutPackage =
        getOrders.slice().map(async order => {
            const orderCheckoutPackage = await Package.findById(order.orderPackage)
            return await Order.findByIdAndUpdate(order._id, { orderCheckoutPackage }, { new: true })
        })
    const orderCheckoutPackage = await Promise.all(insertOrderCheckoutPackage)
    console.log(orderCheckoutPackage)
    if (orderCheckoutPackage.length !== orders.length) throw Error("checkout failed")

    // GENERATE : Invoice Amount
    const orderAmount = orderCheckoutPackage.slice().map(order => order.orderAmount)
    console.log("ORDER AMOUNT")
    console.log(orderAmount)
    const invoiceAmount = orderAmount.reduce((accumulator, currentVal) => accumulator + currentVal)
    console.log("INVOICE AMOUNT")
    console.log(invoiceAmount)
    // GENERATE : Invoice Payment Method
    const invoicePaymentMethod = "CASH"
    // GENERATE : Invoice Contact
    const invoiceContact = await Phone.findOne({ phoneUser: user._id }).then(phone => phone.phoneNumber)
    // INSTANCE
    const newInvoice = new Invoice({
        invoiceOrders: orderIds,
        invoiceAmount,
        invoicePaymentMethod,
        invoiceContact
    })
    // DATABASE : Create INVOICE
    const invoice = await newInvoice.save()
    return await Invoice.findById(invoice._id).populate("invoiceOrders").populate("orderPackage")
}