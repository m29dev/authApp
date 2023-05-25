const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        if (connection) console.log('db has been connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB