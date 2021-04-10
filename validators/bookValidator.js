const { body, param } = require('express-validator');
const { toSlug } = require('../utils/string')
const { Book, User } = require('../models');
const { Op } = require('sequelize');

const validators = {
    id: param('id')
        .exists().withMessage('id is required'),
    title: body('title')
        .exists().withMessage('title is required')
        .custom(async title => {
            const book = await Book.findOne({
                where: {
                    slug: toSlug(title)
                }
            })
            if (book) return Promise.reject();
        }).withMessage('book already exist'),
    editTitle: body('title')
        .exists().withMessage('title is required')
        .custom(async (title, { req }) => {
            const book = await Book.findOne({
                where: {
                    slug: toSlug(title),
                    id: {
                        [Op.not]: req.params.id
                    }
                }
            })
            if (book) return Promise.reject();
        }).withMessage('book already exist'),
    year: body('year')
        .exists().withMessage('year is required')
        .isInt({ gte: 1970 }).withMessage('year must be an integer and greater than 1970'),
    authorId: body('authorId')
        .exists().withMessage('author id is required')
        .custom(async authorId => {
            let user = await User.findByPk(authorId)
            if (!user) return Promise.reject();
        }).withMessage('author not found')
}

const userValidator = {
    createBook: [validators.title, validators.year, validators.authorId],
    getBookById: [validators.id],
    updateBookById: [validators.id, validators.editTitle, validators.year, validators.authorId],
    deleteBookById: [validators.id],
}

module.exports = userValidator