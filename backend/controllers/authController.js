const User = require("../models/authModel")
const bcrypt = require('bcrypt');
const userOTPVerificaion = require("../models/otpVerificationModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET)
}

const signupUser = async (req, res, next) => {
    const { email, password, name } = req.body

    try {
        const response = await User.signup(name, email, password)
        if (response) {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res, next) => {
    const { email, password, remember } = req.body
    try {
        const user = await User.login(email, password)
        
            const token = createToken(user._id)
            res.status(200).json({ email,token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.forgotPassword(email)
        if (user)
            res.status(200).json({ email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const resetPassword=async(req,res)=>{
res.status(200).json({message:'received'})
}
const updatePassword=async(req,res)=>{
res.status(200).json({message:'received'})
}

const verifyOTP = async (req, res) => {
    try {
        const { otp, userId } = req.body

        if (!userId || !otp) {
            throw new Error('Feild must be filled')
        }
        const otpVerificationRecords = await userOTPVerificaion.find({ userId })

        if (otpVerificationRecords <= 0) {
            throw new Error("Acount record does't exist or has been verified already.Please sign up and log in.")
        }

        const { expiredAt } = otpVerificationRecords[0]

        const hashedOTP = otpVerificationRecords[0].otp

        if (expiredAt < Date.now()) {
            throw new Error("Code has expired. please request again.")
        } else {

            const match = await bcrypt.compare(otp, hashedOTP)

            if (!match) {
                throw new Error('Invalid code passed. Check your inbox.')
            } else {

                const updateResponse = await User.updateOne({ _id: userId }, { verified: true })

                if (updateResponse.nModified === 0) {
                    throw new Error('Failed to verify user. Please try again.')
                }

            }

            await userOTPVerificaion.deleteMany({ userId })

            //create a token
            res.json({ statusbar: "VERIFIED", message: "User email" })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message,
            statusbar: "FAILURE"
        })
    }
}

module.exports = { signupUser, loginUser, forgotPassword, verifyOTP,resetPassword,updatePassword }
