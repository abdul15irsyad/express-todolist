'use strict'
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: {
                    association: 'books',
                    attributes: {
                        exclude: ['authorId']
                    }
                }
            })
            return res.status(200).json({
                status: true,
                msg: 'get all users',
                users
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: {
                    exclude: ['password']
                },
                include: {
                    association: 'books',
                    attributes: {
                        exclude: ['authorId']
                    }
                },
            })
            // if no user
            if (!user) {
                return res.status(400).json({
                    status: false,
                    msg: 'user not found',
                })
            }
            return res.status(200).json({
                status: true,
                msg: 'get user',
                user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    updateUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: {
                    exclude: ['password']
                },
                include: {
                    association: 'books',
                    attributes: {
                        exclude: ['authorId']
                    }
                },
            })
            // if no user
            if (!user) {
                return res.status(400).json({
                    status: false,
                    msg: 'user not found',
                })
            }
            user.name = req.body.name
            user.username = req.body.username
            user.email = req.body.email
            user.gender = req.body.gender
            // hash the password
            const SALT_WORK_FACTOR = 5;
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            user.password = await bcrypt.hash(req.body.password, salt);
            await user.save()
            return res.status(200).json({
                status: true,
                msg: 'update user success',
                user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)
            // if no user
            if (!user) {
                return res.status(400).json({
                    status: false,
                    msg: 'user not found',
                })
            }
            await user.remove()
            return res.status(200).json({
                status: true,
                msg: 'delete user success'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    }
}

module.exports = userController