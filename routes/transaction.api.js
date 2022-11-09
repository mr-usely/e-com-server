const express = require('express')
const router = express.Router()
const Transactions = require('../models/transactions.models')
const User = require('../models/user.models')

// Getting all Transactions
router.get('/', async (req, res) => {
    try {
        const transaction = await Transactions.find()
        res.json(transaction)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Getting one transaction
router.get('/:id', getTransaction, (req, res) => {
    res.send(res.transaction)
})


// Getting transaction with product
router.get('/all/products', async (req, res) => {
    try {
        const transaction = await Transactions.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productOrdered',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    status: 1,
                    product: 1,
                    createdAt: 1
                }
            }
        ])

        res.json(transaction)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Create transaction
router.post('/create', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)

        const transaction = new Transactions({
            name: user.firstName +' '+user.lastName,
            email: user.email,
            productOrdered: req.body.productId,
            status: req.body.status
        })

        const newTransactions = await transaction.save()
        res.status(200).json(newTransactions)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Delete transaction
router.delete('/delete/:id', getTransaction, async (req, res) => {
    try {
        await res.transaction.remove()
        res.json({ type: 'success', message: 'Transaction deleted' })
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Middleware
async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transactions.findById(req.params.id)
        if(transaction == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }

    res.transaction = transaction
    next()
}

module.exports = router