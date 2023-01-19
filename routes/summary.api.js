const express = require('express')
const router = express.Router()
const User = require('../models/user.models')
const Transactions = require('../models/transactions.models')
const Products = require('../models/products.models')

// Getting all the loans
router.get('/day', async (req, res) => {
    try {
        const transaction = await Transactions.aggregate([
            {
                '$unwind': '$items'
            }, {
                '$lookup': {
                    'from': 'products',
                    'let': {
                        'productId': {
                            '$toObjectId': '$items.productId'
                        },
                        'items': '$items',
                        'createdAt': '$createdAt'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$productId'
                                    ]
                                }
                            }
                        }, {
                            '$replaceRoot': {
                                'newRoot': {
                                    '$mergeObjects': [
                                        '$$items', '$$ROOT'
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'result'
                }
            }, {
                '$project': {
                    'items': '$items.price',
                    'result': 1,
                    'createdAt': 1
                }
            }, {
                '$match': {
                    '$expr': {
                        '$eq': [
                            {
                                '$dateToString': {
                                    'format': '%Y-%m-%d',
                                    'date': '$$NOW'
                                }
                            }, {
                                '$dateToString': {
                                    'format': '%Y-%m-%d',
                                    'date': '$createdAt'
                                }
                            }
                        ]
                    }
                }
            }
        ])

        const summaryData = {
            day: 0,
            fertilizer: 0,
            seedlings: 0,
            insecticide: 0
        }

        for (let i = 0; i < transaction.length; i++) {
            if (transaction[i].result[0] == undefined) { continue; }
            // summaryData.fertilizer += transaction.
            if (transaction[i].result[0].category == "fertilizer") {
                summaryData.fertilizer = + transaction[i].result[0].subTotal
            } else if (transaction[i].result[0].category == "seedlings") {
                summaryData.seedlings = + transaction[i].result[0].subTotal
            } else if (transaction[i].result[0].category == "insecticide") {
                summaryData.insecticide = + transaction[i].result[0].subTotal
            }
        }

        summaryData.day = summaryData.day + summaryData.fertilizer + summaryData.seedlings + summaryData.insecticide

        // console.log(transaction)
        res.json(summaryData)
    } catch (err) {
        res.status(500).json({ type: 'error', message: err.message })
    }
})


// getting the data in dashboard

router.get('/dashboard', async (req, res) => {
    const transactions = await Transactions.find().count()

    const sold = await Transactions.aggregate([
        {
            '$project': {
                'total_sum': {
                    '$sum': '$total'
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_sold': {
                    '$sum': '$total_sum'
                }
            }
        }
    ])

    const total_products = await Products.find().count()

    const users = await User.find().count()


    const summaryData = {
        total_orders: transactions,
        total_sold: +sold[0].total_sold.toString(),
        total_products: total_products,
        total_users: users
    }

    res.json(summaryData)
})


module.exports = router
