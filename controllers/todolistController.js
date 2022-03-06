'use strict'
const { validationResult } = require('express-validator')
const { Todolist } = require('../models/index')
const { toSlug } = require('../utils/string')

const todolistController = {
    getTodolists: async (req, res) => {
        try {
            const todolists = await Todolist.findAll()
            return res.status(200).json({
                status: true,
                msg: 'get all todolists',
                todolists
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    getTodolistById: async (req, res) => {
        try {
            const todolist = await Todolist.findByPk(req.params.id)
            // if no todolist
            if (!todolist) {
                return res.status(400).json({
                    status: false,
                    msg: 'todolist not found',
                })
            }

            return res.status(200).json({
                status: true,
                msg: 'get todolist',
                todolist
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    createTodolist: async (req, res) => {
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
            const todolist = new Todolist
            todolist.title = req.body.title
            todolist.slug = toSlug(req.body.title)
            await todolist.save()

            return res.status(200).json({
                status: true,
                msg: 'create todolist success',
                todolist
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    updateTodolistById: async (req, res) => {
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
            const todolist = await Todolist.findByPk(req.params.id)
            // if no todolist
            if (!todolist) {
                return res.status(400).json({
                    status: false,
                    msg: 'todolist not found',
                })
            }
            todolist.title = req.body.title
            todolist.slug = toSlug(req.body.title)
            await todolist.save()

            return res.status(200).json({
                status: true,
                msg: 'update todolist success',
                todolist
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    },
    deleteTodolistById: async (req, res) => {
        try {
            const todolist = await Todolist.findByPk(req.params.id)
            // if no todolist
            if (!todolist) {
                return res.status(400).json({
                    status: false,
                    msg: 'todolist not found',
                })
            }
            await todolist.destroy()
            return res.status(200).json({
                status: true,
                msg: 'delete todolist success'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: error.message
            })
        }
    }
}

module.exports = todolistController