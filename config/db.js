const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://admin:mdb2023@clusterapp.vktihlt.mongodb.net/ReactJwt?retryWrites=true&w=majority')
        if (connection) console.log('db has been connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
