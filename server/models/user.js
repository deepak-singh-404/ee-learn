const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    avatar: {
        type: String
    },
    coursesCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'course'
    }],
    coursesBought: [{
        type: Schema.Types.ObjectId,
        ref: 'course'
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'course'
    }],
    totalIncome: {
        type: Number,
        default: 0
    },
    totalExpenditure: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('user', userSchema)
