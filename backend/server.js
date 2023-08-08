require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')
const plaidRoutes = require('./routes/plaid')
const cors = require('cors')


const app = express()

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors())
app.use(express.json())


// user routes
app.use("/api/user", userRoutes)

// routes
app.use("/api/transactions", transactionRoutes)

app.use("/api/plaid", plaidRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and server is listening on port", process.env.PORT);
        })
    })
    .catch(err => {
        console.log(err)
    })



