const express = require('express');
const router = express.Router();

const { todolistController } = require('../../../controllers');
const { createTodolist, updateTodolistById } = require('../../../validators/todolistValidator');

router.get('/', todolistController.getTodolists);
router.post('/', createTodolist, todolistController.createTodolist)
router.get('/:id', todolistController.getTodolistById)
router.put('/:id', updateTodolistById, todolistController.updateTodolistById)
router.delete('/:id', todolistController.deleteTodolistById);

module.exports = router;
