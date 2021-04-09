const express = require('express');
const router = express.Router();

const { bookController } = require('../../../controllers');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById)
router.put('/:id', bookController.updateBookById)
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
