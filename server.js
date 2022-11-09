require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database Connected'))

app.use(cors())
app.use(express.json())

// admin
const api = require('./routes/api')
app.use('/admin', api)

// users
const users = require('./routes/users.api')
app.use('/user', users)

// products
const products = require('./routes/products.api')
app.use('/products', products)

// Transaction of orders
const transactions = require('./routes/transaction.api')
app.use('/transactions', transactions)

// Review
const reviews = require('./routes/review.api')
app.use('/reviews', reviews)

// Add to Cart
const addToCart = require('./routes/cart.api')
app.use('/cart', addToCart)


// Wishlist
const wishlist = require('./routes/wishlist.api')
app.use('/wishlist', wishlist)

app.listen(3030, () => console.log('Server Started'))