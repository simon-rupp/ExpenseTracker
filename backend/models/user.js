const Transaction = require('./transaction') 
const bcrypt = require('bcryptjs')


const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: false,
    },
    item_id: {
        type: [String],
        required: false,
    },
    plaidCursor: {
        type: String,
        required: false,
    },
})

userSchema.statics.register = async function (username, password) {
    if (!username || !password) {
        throw new Error('Please enter a username and password')
    }
    
    const exists = await this.findOne({ username })
    if (exists) {
        throw new Error('Username already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await this.create({ username, password: hashedPassword })
    return user
}

userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw new Error('Please enter a username and password')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw new Error('Username is incorrect')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Password is incorrect')
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User