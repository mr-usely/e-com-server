const express = require('express')
const router = express.Router()
const Loans = require('../models/loans.model')

// Getting all the loans
router.get('/', async (req, res) => {
    try {
        const loan = await Loans.find()
        res.json(loan)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

//create reviews
router.post('/create', async (req, res) => {
    try {
        const loan = new Loans({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            area: req.body.area,
            occupation: req.body.occupation,
            monthly: req.body.monthly,
            borrowOption: req.body.borrowOption,
            borrow: req.body.borrow,
            status: 'Pending',
            user: req.body.user
        })

        const newLoan = await loan.save()
        res.status(201).json(newLoan)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})


// Getting all loans of a user
router.get('/:id', async (req, res) => {
    try {

        const loan = await Loans.find({
            user: req.params.id
        })

        res.send(loan)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})


// approve / disapprove loan
router.patch('/approval/:id', getLoan, async (req, res) => {
    try {
        if (req.body.status != null) {
            res.loan.status = req.body.status
        }

        const approveLoan = await res.loan.save()
        res.status(201).json(approveLoan)
    } catch (err) {
        res.status(400).json({ type: 'error', message: err.message })
    }
})


// Midleware
async function getLoan(req, res, next) {
    let loan
    try {
        loan = await Loans.findById(req.params.id)
        if (loan == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }

    res.loan = loan
    next()
}

module.exports = router
