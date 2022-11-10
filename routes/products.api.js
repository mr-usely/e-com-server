const express = require('express')
const router = express.Router()
const Products = require('../models/products.models')


// Getting all the products
router.get('/', async (req, res) => {
    try {
        const product = await Products.find()
        res.json(product)
    } catch (err) {
        res.status(400).json({ type: 'error', message: err.message })
    }
})


// Getting One
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product)
})


// Create products
router.post('/create', async (req, res) => {
    try {
        const product = new Products({
            name: req.body.name,
            image: req.body.image,
            shortDescription: req.body.shortDescription,
            featureDescription: req.body.featureDescription,
            price: req.body.price,
            qty: req.body.qty,
            status: req.body.status,
            category: req.body.category
        })

        const newProducts = await product.save()
        res.status(201).json(newProducts)
    } catch (err) {
        res.status(400).json({ type: 'error', message: err.message })
    }
})


// Updating product info
router.patch('/update/:id', getProduct, async (req, res) => {
    try {
        if(req.body.name != null) {
            res.product.name = req.body.name
        }

        if(req.body.image != null){
            res.product.image = req.body.image
        }

        if(req.body.shortDescription != null){
            res.product.shortDescription = req.body.shortDescription
        }

        if(req.body.featureDescription != null){
            res.product.featureDescription = req.body.featureDescription
        }

        if(req.body.price != null){
            res.product.price = req.body.price
        }

        if(req.body.qty != null){
            res.product.qty = req.body.qty
        }

        if(req.body.status != null){
            res.product.status = req.body.status
        }

        if(req.body.category != null){
            res.product.category = req.body.category
        }

    
        const updatedProduct = await res.product.save()
        const product = await Products.find()

        if(updatedProduct){
            res.status(201).json(product)
        }
    } catch (err) {
        res.status(400).json({ type: 'error', message: err.message })
    }
})


// Deleting product
router.delete('/delete/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ type: 'success', message: 'Product deleted' })
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})


// Midleware
async function getProduct(req, res, next) {
    let product
    try {
        product = await Products.findById(req.params.id)
        if(product == null){
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }

    res.product = product
    next()
}


module.exports = router