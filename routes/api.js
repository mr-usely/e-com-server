const express = require('express')
const router = express.Router()
const Admin = require('../models/admin.models')
const bcrypt = require('bcrypt')

// Getting all the admin
router.get('/users', async (req, res) => {
    try {
        const auth = await Admin.find()
        res.json(auth)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})

// Creating admin account
router.post('/create', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)

        const auth = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })

        const newAuth = await auth.save()
        res.status(201).json(newAuth)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})


// Loging in admin
router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email })

    if(admin == null) {
        return res.status(400).json({ type: 'error', message: "No user found" })
    }

    try {
        if(await bcrypt.compare(req.body.password, admin.password)) {
            res.status(201).json({ type: 'success',message: 'Successfuly Loged in' })
        } else {
            res.json({ type: 'error', message: 'Not Allowed' })
        }
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})



module.exports = router