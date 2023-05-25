const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const path = require('path')
// const cors = require('cors')

//routes
const userRoutes = require('./routes/userRoutes')
//middleware
const errorMiddleware = require('./middleware/errorMiddleware')

app.listen(process.env.PORT, () => {
    console.log('server is listening at port 3000')
})

connectDB()

// app.use(cors({
//     origin: 'http://localhost:4000'
// }))

//for retrieving body data
app.use(express.json())
//for form data
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

// if (process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve()
//     app.use(express.static(path.join(__dirname, 'client/dist')))
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')))
// } else {
//     app.get('/', (req, res) => {
//         res.send('server is ready')
//     })
// }

app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)
