const mongoose = require('mongoose')

const wishListModel = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId, ref: 'Users'
    }
}, { timestamps: true, collection: 'wish-list' })

module.exports = mongoose.model('WishList', wishListModel)