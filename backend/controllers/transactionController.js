const Transaction = require('../models/transaction')
const User = require('../models/user')
const mongoose = require('mongoose')

// GET all transactions
const getAllTransactions = async (req, res) => {

    //const transactions = await Transaction.find({userID: req.params.userId}).sort({createdAt: -1})

    const userID = req.user._id

    const transactions = await Transaction.find({userID}).sort({createdAt: -1})

    res.status(200).json(transactions)

}

// GET a transaction
const getTransaction = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Transaction not found"})
    }
    const transaction = await Transaction.findById(id)

    if (!transaction) {
        return res.status(404).json({message: "Transaction not found"})
    }
    res.status(200).json(transaction)
}

// POST a transaction
const createTransaction = async (req, res) => {
    const {name, type, amount, userID} = req.body

    let emptyFeilds = []

    if (!name) {
        emptyFeilds.push("name")
    }
    if (!type) {
        emptyFeilds.push("type")
    }
    if (!amount) {
        emptyFeilds.push("amount")
    }

    if (emptyFeilds.length > 0) {
        return res.status(400).json({error: `Please enter a the following field(s): ${emptyFeilds.join(", ")}`, emptyFeilds})

    }
    // function to cut off any numbers past the second decimal place
    const truncate = (num) => {
        return Math.trunc(num * 100) / 100
    }

    try {
        const newAmount = truncate(amount)
        const userID = req.user._id
        const transaction = await Transaction.create({name, type, amount: newAmount, userID})
        
        res.status(201).json(transaction)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a transaction
const deleteTransaction = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Transaction not found"})
    }
    const transaction = await Transaction.findByIdAndDelete(id)
    if (!transaction) {
        return res.status(404).json({message: "Transaction not found"})
    }
    res.status(200).json(transaction)
}

// UPDATE a transaction
const updateTransaction = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Transaction not found"})
    }
    const transaction = await Transaction.findOneAndUpdate({_id: id}, {
        ...req.body,
    })
    if (!transaction) {
        return res.status(404).json({message: "Transaction not found"})
    }
    res.status(200).json(transaction)
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransaction,
    deleteTransaction,
    updateTransaction
}