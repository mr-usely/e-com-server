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
    productOrdered: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Products'
    },
    status: {
        type: String
    }
}, { timestamps: true, collection: 'transactions' })

module.exports = mongoose.model('Transactions', transactModel)