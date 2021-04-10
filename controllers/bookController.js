'use strict'
const { Book } = require('../models')
const { toSlug } = require('../utils/string')

const bookController = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.findAll({
                attributes: {
                    exclude: ['authorId']
                },
                include: [{
                    association: 'author',
                    attributes: {
                        exclude: ['password']
                    }
                }]
            })
            return res.status(200).json({
                status: true,
                msg: 'get all books',
                books
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    getBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id, {
                attributes: {
                    exclude: ['authorId']
                },
                include: [{
                    association: 'author',
                    attributes: {
                        exclude: ['password']
                    }
                }]
            })
            // if no book
            if (!book) {
                return res.status(400).json({
                    status: false,
                    msg: 'book not found',
                })
            }
            return res.status(200).json({
                status: true,
                msg: 'get book',
                book
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    createBook: async (req, res) => {
        try {
            const book = new Book
            book.title = req.body.title
            book.slug = toSlug(req.body.title)
            book.desc = req.body.desc
            book.authorId = req.body.authorId
            await book.save()
            return res.status(200).json({
                status: true,
                msg: 'create book success',
                book
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    updateBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id, {
                attributes: {
                    exclude: ['authorId']
                },
                include: {
                    association: 'author',
                    attributes: {
                        exclude: ['password']
                    }
                },
            })
            // if no book
            if (!book) {
                return res.status(400).json({
                    status: false,
                    msg: 'book not found',
                })
            }
            book.title = req.body.title
            book.slug = toSlug(req.body.title)
            book.desc = req.body.desc
            await book.save()
            return res.status(200).json({
                status: true,
                msg: 'update book success',
                book
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    deleteBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id)
            // if no book
            if (!book) {
                return res.status(400).json({
                    status: false,
                    msg: 'book not found',
                })
            }
            await book.remove()
            return res.status(200).json({
                status: true,
                msg: 'delete book success'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    }
}

module.exports = bookController