const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.isAuthenticated = async (req, res, next) => {
    try {
        // check token
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(400).json({ status: false, msg: 'token not found' })
        }

        // validate jwt token
        const { username } = jwt.verify(token, process.env.JWT_SECRET)
        if (!username) {
            return res.status(401).json({ status: false, msg: 'invalid credential' })
        }

        // put user on request
        req.user = await User.findOne({ where: { username } })
        next()
    } catch (error) {
        return res.status(500).json({ status: false, msg: error.message })
    }
}
