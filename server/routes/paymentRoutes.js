const express = require('express');
const router = express.Router()
const { v4: uuid } = require("uuid")
const instance = require('../config/payment');
const Transaction = require('../models/transactionSchema')
const createSignature = require('../utils/createSignature')



router.post('/order', async (req, res, next) => {
    try {
        const { body: { name, amountInPaise, currency } } = req
        const orderOptions = {
            amount: amountInPaise,
            currency,
            receipt: uuid(),
            payment_capture: 0
        }
        const order = await instance.orders.create(orderOptions)

        const transaction = {
            _Id: orderOptions.receipt,
            user: name,
            orderValue: `${amountInPaise / 100} ${currency}`,
            razorpayOrderId: order.id,
            razorpayTransactionId: null,
            razorpaySignature: null,
            isPending: true,
        }

        //store this in transaction database
        const newTransaction = await Transaction.create(transaction)
        await newTransaction.save()
        res.status(201).json({
            message: "Order Created", order: {
                _id: order.id,
                name,
                amount: transaction.orderValue
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", err: err.message })

    }
})

router.post('/verification', async (req, res, next) => {
    try {
        const {
            amount,
            currency,
            razorpayOrderId,
            razorpayTransactionId,
            razorpaySignature
        } = req.body
        const createdSignature = createSignature(razorpayOrderId, razorpayTransactionId);
        if (createdSignature !== razorpaySignature)
            return res.status(401).json({ message: "Invalid Payment Request" })
        const captureResponse = await instance.payments.capture(razorpayTransactionId, amount, currency);
        const particularTransaction = await Transaction.findOne({ razorpayOrderId })
        console.log("hey", particularTransaction)
        particularTransaction.razorpayTransactionId = razorpayTransactionId,
            particularTransaction.razorpaySignature = razorpaySignature,
            particularTransaction.isPending = false
        await particularTransaction.save()
        console.log("bye", particularTransaction)
        res.status(201).json(captureResponse)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", Error: err.message })
    }
})





module.exports = router