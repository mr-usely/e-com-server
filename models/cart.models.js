const mongoose = require('mongoose')

const cartModel = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId, ref: 'Products'
    },
    user: {
        type: mongoose.Types.ObjectId, ref: 'Users'
    }
}, { timestamps: true, collection: 'Carts' })

module.exports = mongoose.model('Carts', cartModel)