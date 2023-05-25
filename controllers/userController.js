const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../config/generateToken')

//desc      Auth user/set token
//route     POST /api/user/auth
//access    public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(email, password)

        const user = await User.findOne({ email })

        const validPassword = () => {
            if (user) {
                return bcrypt.compareSync(password, user.password)
            }
        }

        if (user && validPassword) {
            generateToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(401).json({ message: 'error email or password' })
            //throw new Error('invaild email or password')
        }
    } catch (err) {
        console.log(err)
    }
}

//desc      Register a new user
//route     POST /api/user
//access    public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) return res.status(403).json({ message: 'type all data!' })

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('user already exists')
        }

        const user = new User({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 8)
        })
        const userSave = await user.save()

        if (userSave) {

            generateToken(res, userSave._id)

            res.status(201).json({
                _id: userSave._id,
                name: userSave.name,
                email: userSave.email
            })
        } else {
            res.status(400)
            throw new Error('invalid user data')
        }
    } catch (err) {
        console.log(err)
    }
}

//desc      Logout user
//route     POST /api/user/logout
//access    public
const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({ message: 'user logged out User' })
    } catch (err) {
        console.log(err)
    }
}

//desc      Get user profile
//route     GET /api/user/profile
//access    private
const getUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'Get User' })
    } catch (err) {
        console.log(err)
    }
}

//desc      Update user profile
//route     PUT /api/user/profile
//access    private
const updateUser = async (req, res) => {
    try {
        const { _id, name, email, password } = req.body

        const resultUser = await User.findById({ _id })

        const nameEdit = name ? name : resultUser.name
        const emailEdit = email ? email : resultUser.email
        const passwordEdit = password ? bcrypt.hashSync(password, 8) : resultUser.password

        const updatedUser = await User.findOneAndUpdate({ _id }, { name: nameEdit, email: emailEdit, password: passwordEdit }, { new: true })

        if (updatedUser) {
            res.status(201).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            })
        } else {
            res.status(400).json({ message: 'could not update' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUser,
    updateUser
}