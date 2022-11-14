const express = require('express')
const router = express.Router()
const Carts = require('../models/cart.models')
const Products = require('../models/products.models')

// Getting all Carts
router.get('/', async (req, res) => {
    try {
        const cart = await Carts.find()
        res.json(cart)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Getting all carts of a user
router.get('/:id', async (req, res) => {
    try {

        const cart = await Carts.find({
            user: req.params.id
        })

        res.send(cart)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Add to Cart
router.post('/add', async (req, res) => {
    try {
        const product = await Products.findById(req.body.productId)

        const cart = new Carts({
            product: product.name,
            price: product.price,
            image: product.image,
            featureDescription: product.featureDescription,
            qty: req.body.qty,
            productId: product._id,
            user: req.body.userId
        })

        const newCart = await cart.save()
        res.status(201).json(newCart)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Remove from cart
router.delete('/remove/:id', getCart, async (req, res) => {
    try {
        await res.cart.remove()
        res.json({ type: 'success', message: 'Cart remove' })
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Midleware
async function getCart(req, res, next) {
    let cart
    try {
        cart = await Carts.findById(req.params.id)
        if (cart == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }

    res.cart = cart
    next()
}

module.exports = router