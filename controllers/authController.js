const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User } = require('../models')

const authController = {
    login: async (req, res) => {
        try {
            // find user
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: req.body.username },
                        { email: req.body.username },
                    ]
                }
            })
            // if there is no user
            if (!user) {
                return res.status(400).json({
                    status: false,
                    msg: 'username or password is incorrect'
                })
            }
            // check password
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            )
            // if password is incorrect
            if (!passwordMatch) {
                return res.status(400).json({
                    status: false,
                    msg: 'username or password is incorrect'
                })
            }
            // generate jwt token from user
            const token = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1m' }
            )
            return res.status(200).json({
                message: 'login success',
                username: user.username,
                token
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    signup: async (req, res) => {
        try {
            // if validation failed
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: 'validation failed',
                    errors: errors.array({ onlyFirstError: true })
                })
            }
            // create user
            const user = new User
            user.name = req.body.name
            user.username = req.body.username
            user.email = req.body.email
            user.gender = req.body.gender
            // hash the password
            const SALT_WORK_FACTOR = 5
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
            user.password = await bcrypt.hash(req.body.password, salt)
            await user.save()
            return res.status(200).json({
                status: true,
                msg: 'signup success',
                user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    getUser: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                msg: 'get auth user',
                user: req.user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    }
}

module.exports = authController
