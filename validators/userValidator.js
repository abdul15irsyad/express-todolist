const { body, param } = require("express-validator");
const { Op } = require("sequelize");
const { User } = require('../models')

const validators = {
    id: param('id')
        .exists().withMessage('id is required'),
    name: body('name')
        .exists().withMessage('name is required'),
    username: body('username')
        .exists().withMessage('username is required')
        .custom(async username => {
            const user = await User.findOne({
                where: {
                    username
                }
            })
            if (user) return Promise.reject();
        }).withMessage('username already used'),
    editUsername: body('username')
        .exists().withMessage('username is required')
        .custom(async (username, { req }) => {
            const user = await User.findOne({
                where: {
                    username,
                    id: {
                        [Op.not]: req.params.id
                    }
                }
            })
            if (user) return Promise.reject();
        }).withMessage('username already used'),
    email: body('email')
        .exists().withMessage('email is required')
        .isEmail().withMessage('email not valid')
        .custom(async email => {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) return Promise.reject();
        }).withMessage('email already used'),
    editEmail: body('email')
        .exists().withMessage('email is required')
        .isEmail().withMessage('email not valid')
        .custom(async email => {
            const user = await User.findOne({
                where: {
                    email,
                    id: {
                        [Op.not]: req.params.id
                    }
                }
            })
            if (user) return Promise.reject();
        }).withMessage('email already used'),
    gender: body('gender')
        .exists().withMessage('gender is required')
        .isIn(['m', 'f']).withMessage('gender is m for male or f for female'),
    oldPassword: body('oldPassword')
        .exists().withMessage('old password is required'),
    password: body('password')
        .exists().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password must be at least 8 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])./).withMessage('password must contain lowercase, uppercase, and number'),
    confirmPassword: body('confirmPassword')
        .custom((confirmPassword, { req }) => confirmPassword === req.body.password).withMessage('confirm password doesn\'t match')
}

module.exports = {
    createUser: [validators.name, validators.username, validators.email, validators.password],
    getUserById: [validators.id],
    updateUserById: [validators.id, validators.name, validators.editUsername, validators.editEmail],
    // updateUserPasswordById: [validators.id, validators.oldPassword, validators.password, validators.confirmPassword],
    deleteUserById: [validators.id]
}