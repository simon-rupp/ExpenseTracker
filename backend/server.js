require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')
const cors = require('cors')


const app = express()


// middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// user routes
app.use("/user", userRoutes)

// routes
app.use("/transactions", transactionRoutes)

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



