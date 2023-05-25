const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/auth', controller.authUser)
router.post('/', controller.registerUser)
router.post('/logout', controller.logoutUser)
router.get('/profile', controller.getUser)
router.put('/profile', controller.updateUser)

module.exports = router