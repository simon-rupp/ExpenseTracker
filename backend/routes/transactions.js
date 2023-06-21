const express = require('express')
const {
    createTransaction,
    getAllTransactions,
    getTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController')
const router = express.Router()
const verifyToken = require('../routes/user')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// GET all transactions
router.get('/', getAllTransactions)

// GET a transaction
router.get('/:id', getTransaction)

// POST a transaction
router.post('/', verifyToken, createTransaction)

// DELETE a transaction
router.delete('/:id', deleteTransaction)

// UPDATE a transaction
router.patch('/:id', updateTransaction)

module.exports = router