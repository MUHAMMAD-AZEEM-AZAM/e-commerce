const express = require('express')
const { signupUser, loginUser, forgotPassword, verifyOTP, resetPassword,updatePassword } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/forgotPassword', forgotPassword)
router.post('/verifyOTP', verifyOTP)
router.post('/resetPassword', resetPassword)
router.post('/updatePassword', updatePassword)

module.exports = router