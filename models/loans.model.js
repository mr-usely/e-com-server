const mongoose = require('mongoose')

const loansModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    monthly: {
        type: String,
        required: true
    },
    borrowOption: {
        type: String,
        required: true,
    },
    borrow: {
        type: String,
        required: true,
    },
    status: {
        type: String
    }
}, { timestamps: true, collection: 'loans' })

module.exports = mongoose.model('Loans', loansModel)