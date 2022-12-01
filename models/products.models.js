const mongoose = require('mongoose')

const productsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    image: {
        type: String
    },
    shortDescription: {
        type: String,
        required: true,
        maxLength: 100
    },
    featureDescription: {
        type: String,
        required: true,
        maxLength: 300
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
        get: getPrice
    },
    qty: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    stat: {
        type: String,
        required: true
    }
}, { collection: 'products', timestamps: true, toJSON: { getters: true } })

function getPrice(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};

module.exports = mongoose.model('Products', productsModel)