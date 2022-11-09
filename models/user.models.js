const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    totalAmountOrdered: {
        type: mongoose.Types.Decimal128
    }
}, { timestamps: true, collection: 'users' })

module.exports = mongoose.model('Users', userModel)