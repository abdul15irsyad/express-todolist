const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.isAuthenticated = async (req, res, next) => {
    try {
        // check token
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(400).json({
                status: false,
                msg: 'token not found'
            })
        }
        // validate jwt token
        jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
            if (error) {
                if (error.message == 'jwt expired') error.message = 'token expired'
                else error.message = 'invalid credential'
                return res.status(401).json({
                    status: false,
                    msg: error.message
                })
            }
            // put user on request
            req.user = await User.findOne({
                where: { username: decode.username },
                attributes: {
                    exclude: ['id', 'password']
                }
            })
            next()
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        })
    }
}
