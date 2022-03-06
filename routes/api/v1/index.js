const express = require('express')
const router = express.Router()

const todolists = require('./todolists')

router.use('/todolists', todolists)

module.exports = router