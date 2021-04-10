const express = require('express');
const router = express.Router();

const { bookController } = require('../../../controllers');
const { getBookById, createBook, updateBookById, deleteBookById } = require('../../../validators/bookValidator');

router.get('/', bookController.getBooks);
router.post('/', createBook, bookController.createBook)
router.get('/:id', getBookById, bookController.getBookById)
router.put('/:id', updateBookById, bookController.updateBookById)
router.delete('/:id', deleteBookById, bookController.deleteBookById);

module.exports = router;
