const mongoose = require('mongoose')

const reviewsModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rate: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    productReviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
}, { timestamps: true, collection: 'reviews' })


module.exports = mongoose.model('Reviews', reviewsModel)