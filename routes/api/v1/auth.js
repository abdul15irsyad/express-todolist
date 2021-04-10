const express = require('express');
const router = express.Router();

const { authController } = require('../../../controllers');
const { authMiddleware } = require('../../../middlewares');
const { createUser } = require('../../../validators/userValidator');

router.post('/login', authController.login);
router.post('/signup', createUser, authController.signup);
router.get('/user', authMiddleware.isAuthenticated, authController.getUser);

module.exports = router;
