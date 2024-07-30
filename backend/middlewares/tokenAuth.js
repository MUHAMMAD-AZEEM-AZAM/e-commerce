const jwt = require('jsonwebtoken')
const User = require('../models/authModel')

const tokenAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.json({ error: 'Authorization token required' })
        }
        const token = authorization.split(' ')[1]
        const { _id } = jwt.verify(token, process.env.SECRET)
        if (!_id) {
            return res.json({ error: 'Token is not Valid' })
        }
        const user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log("Error in token Auth middleware",error)
        res.status(401).json({error:"Request is not authorized"})
    }

}
module.exports = tokenAuth