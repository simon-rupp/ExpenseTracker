const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    amount: {
        type: Number,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    plaidTransactionID: { // called transaction_id in plaid
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    category: {
        type: [String],
        required: false
    }  
}, {timestamps: true})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction