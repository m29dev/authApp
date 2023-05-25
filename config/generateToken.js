const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_KEY, {
        expiresIn: '3600000'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600000
    })
}

module.exports = generateToken