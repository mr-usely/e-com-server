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
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0,
        get: getCosts
    },
    items: [],
    status: {
        type: String
    },
    id: false
}, { timestamps: true, collection: 'transactions', toJSON: { getters: true } })

function getCosts(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};

module.exports = mongoose.model('Transactions', transactModel)