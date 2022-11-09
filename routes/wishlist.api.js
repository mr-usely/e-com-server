const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist.model')
const Products = require('../models/products.models')

// Getting all Carts
router.get('/', async (req, res) => {
    try {
        const wishlist = await Wishlist.find()
        res.json(wishlist)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Getting all wislist of a user
router.get('/:id', async (req, res)  => {
    try {
        const wishlist = await Wishlist.find({
            user: req.params.id
        })

        res.send(wishlist)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Add to Wishlist
router.post('/add', async (req, res) => {
    try {
        const product = await Products.findById(req.body.productId)

        const wishlist = new Wishlist({
            product: product.name,
            price: product.price,
            user: req.body.userId
        })

        const newWishlist = await wishlist.save()
        res.status(201).json(newWishlist)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Remove from wishlist
router.delete('/remove/:id', getWishlist, async (req, res) => {
    try {
        await res.wishlist.remove()
        res.json({ type: 'success', message: 'Wishlist remove' })
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Middleware
async function getWishlist(req, res, next) {
    let wishlist
    try {
        wishlist = await Wishlist.findById(req.params.id)
        if(wishlist == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }

    res.wishlist = wishlist
    next()
}

module.exports = router