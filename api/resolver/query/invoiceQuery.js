const Invoice = require("../../../models/invoice")
const userCheck = require('../../helpers/userCheck')


exports.getInvoices = async (root, args, { decoded }) => await Invoice.find({ invoiceUser: decoded._id }).select('-invoiceUser').populate("invoiceOrders").populate("orderCheckoutPackage")

exports.getInvoice = async (root, { invoice }, { decoded }) => {
    const user = await userCheck(decoded)
    const isUserInvoice = await Invoice.findById(invoice._id).then(
        invoice => user._id.toString() === invoice.invoiceUser.toString()
    )
    if (!isUserInvoice) throw Error("No access")
    return await Invoice.findById(invoice._id).select('-invoiceUser').populate("invoiceOrders").populate("orderCheckoutPackage")
}