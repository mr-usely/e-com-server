const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews.models')

// Getting all reviews
router.get('/', async (req, res) => {
    try {
        const review = await Reviews.find()
        res.json(review)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Create reviews
router.post('/create', async (req, res) => {
    try {
        const review = new Reviews({
            username: req.body.username,
            review: req.body.review,
            rate: req.body.rate,
            productReviewed: req.body.productId
        })

        const newReviews = await review.save()
        res.status(201).json(newReviews)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

module.exports = router