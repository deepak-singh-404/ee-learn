const mongoose = require('mongoose')
const { Schema } = mongoose


const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    price: {
        type: String
    },
    duration: {
        type: Number,
        default: 0
    },
    userWhoHasBought: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    qna: [{
        sender: {
            type: String
        },
        message: {
            type: String
        }
    }]
})


module.exports = mongoose.model('course', courseSchema)
