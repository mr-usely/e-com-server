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
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    status: {
        type: String
    },
    category: {
        type: String
    },
    rating: {
        type: mongoose.Types.Decimal128
    }
}, { collection: 'products', timestamps: true })

module.exports = mongoose.model('Products', productsModel)