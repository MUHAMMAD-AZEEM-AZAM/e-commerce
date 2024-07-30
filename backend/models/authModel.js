const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const userOTPVerificaion = require('./otpVerificationModel');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false,
    },
    secure: true
})

userSchema.statics.login = async function (email, password) {
    console.log("login called", email, password)

    if (!email || !password) {
        throw new Error("All feild must be filled")
    }

    if (!validator.isEmail(email)) {
        throw new Error("Enter valid Email")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error("No user exist with this email")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error("Incorrect Password")
    }

    if (!user.verified) {
        throw new Error("User Not verfied")
    }

    return user
}
userSchema.statics.signup = async function (name, email, password) {
    console.log("signup called")
    if (!name || !email || !password) {
        throw new Error("All feild must be filled")
    }
    if (!validator.isEmail(email)) {
        throw new Error("Enter valid Email")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Week Password")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })
    const otpResponse = await sendOtpVerification({ id: user._id, email, subject: 'Verify Your Email' })
    return { user, otpResponse };
}

userSchema.statics.forgotPassword = async function (email) {
    if (!email) {
        throw new Error('Feild must be filled')
    }

    if (!validator.isEmail(email)) {
        throw new Error("Enter valid Email")
    }

    const user = await this.findOne({ email })
    console.log(email)
    if (!user) {
        throw new Error('User Not Exists')
    }
    const id = user._id
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const otpResponse = sendOtpVerification({ id, email, subject: 'Forgot Password' ,html:`<h1>Password Reset!</h1><p>Enter <b>${otp}</b> on website to Reset your password</p><strong>Don't share this code with anyone</strong>`})

    return { user, otpResponse }
}

const sendOtpVerification = async ({ id, email, subject ,html}) => {
    const newHtml=html||`<p style="background-color:#ff123">Enter <b>${otp}</b> on the website to verify your email address.</p><p>This OTP expires in one hour.</p>`

    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: newHtml
        }

        const salt = await bcrypt.genSalt(10);
        const hashOtp = await bcrypt.hash(otp, salt)

        const newOtpVerification = new userOTPVerificaion({
            userId: id,
            otp: hashOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000
        })

        await newOtpVerification.save();

        await transporter.sendMail(mailOptions)
        return {
            status: "PENDING",
            message: 'Verification OTP email send',
            data: {
                userId: id,
                email
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = mongoose.model('User', userSchema)