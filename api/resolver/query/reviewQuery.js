const Review = require("../../../models/review")

exports.getReviews = async (root, { package }) => {
    const ratingAverage = await Review.aggregate({ $match: { reviewPackage: package._id }, $group: { ratingAverage: { $avg: "reviewRating" } } }).then(rating => rating.ratingAverage)
    const reviews = await Review.find({ reviewPackage: package._id }).exec()
    return {
        ratingAverage,
        reviews
    }
}

exports.getReviews = async (root, { invoice }, { decoded }) => {
    const user = await userCheck(decoded)
    const isUserInvoice = await Invoice.findById(invoice._id).then(
        invoice => user._id.toString() === invoice.invoiceUser.toString()
    )
    if (!isUserInvoice) throw Error("No access")
    return await Invoice.findById(invoice._id).select('-invoiceUser').populate("invoiceOrders").populate("orderCheckoutPackage")
}