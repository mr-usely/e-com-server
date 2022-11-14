const mongoose = require('mongoose')

const transactModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    total: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    items: [],
    status: {
        type: String
    }
}, { timestamps: true, collection: 'transactions' })

module.exports = mongoose.model('Transactions', transactModel)