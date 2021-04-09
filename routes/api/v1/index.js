const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../../../middlewares')
const auth = require('./auth')
const user = require('./user')
const book = require('./book')

router.use('/auth', auth)
router.use(authMiddleware.isAuthenticated)
router.use('/user', user)
router.use('/book', book)

module.exports = router