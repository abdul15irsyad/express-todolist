const express = require('express');
const router = express.Router();

const { userController } = require('../../../controllers');
const { getUserById, updateUserById, deleteUserById } = require('../../../validators/userValidator')

router.get('/', userController.getUsers);
router.get('/:id', getUserById, userController.getUserById)
router.put('/:id', updateUserById, userController.updateUserById)
router.delete('/:id', deleteUserById, userController.deleteUserById);

module.exports = router;
