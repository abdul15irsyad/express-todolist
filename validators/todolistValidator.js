const { body, param } = require('express-validator');
const { toSlug } = require('../utils/string')
const { Todolist } = require('../models/index');
const { Op } = require('sequelize');

const validators = {
    id: param('id')
        .exists().withMessage('id is required'),
    title: body('title')
        .exists().withMessage('title is required')
        .custom(async title => {
            const todolist = await Todolist.findOne({
                where: {
                    slug: toSlug(title)
                }
            })
            if (todolist) return Promise.reject();
        }).withMessage('todolist already exist'),
    editTitle: body('title')
        .exists().withMessage('title is required')
        .custom(async (title, { req }) => {
            const todolist = await Todolist.findOne({
                where: {
                    slug: toSlug(title),
                    id: {
                        [Op.not]: req.params.id
                    }
                }
            })
            if (todolist) return Promise.reject();
        }).withMessage('todolist already exist'),
}

module.exports = {
    createTodolist: [validators.title],
    updateTodolistById: [validators.editTitle],
}