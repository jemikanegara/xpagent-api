const Review = require('../../../models/review')
const userCheck = require('../../helpers/userCheck')

exports.createReview = async (root, { review }, { decoded }) => {

    const user = await userCheck(decoded)
    if (!user) throw Error("No access")

    const { reviewOrder,
        reviewInvoice,
        reviewPackage,
        reviewRating,
        reviewComment } = review

    const newReview = new Review({
        reviewOrder,
        reviewInvoice,
        reviewPackage,
        reviewRating,
        reviewComment
    })

    return await newReview.save()
}