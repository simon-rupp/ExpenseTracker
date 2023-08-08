const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: '3d'})
}


const register = async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.register(username, password)

        const token = createToken(user._id)
        res.status(201).json({token, username: user.username})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.login(username, password)

        const token = createToken(user._id)
        res.status(201).json({token, username: user.username})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}




module.exports = {
    register, 
    login
}