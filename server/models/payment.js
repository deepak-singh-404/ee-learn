const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const transactionSchema = new Schema({
    _Id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayTransactionId: {
        type: String,
        default: null
    },
    razorpaySignature: {
        type: String,
        default: null
    },
    orderValue: {
        type: String,
        required: true
    },
    isPending: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model('payment', transactionSchema)