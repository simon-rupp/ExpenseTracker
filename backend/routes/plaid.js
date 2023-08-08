const express = require('express')

const {
    createLinkToken,
    exchangePublicToken,
    retrievePlaidTransactions
} = require('../controllers/plaidController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth)

router.post("/create_link_token", createLinkToken)

router.post("/set_access_token", exchangePublicToken)

router.post("/transactions", retrievePlaidTransactions)



module.exports = router;