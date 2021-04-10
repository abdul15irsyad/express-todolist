const express = require('express')
const router = express.Router()

const v1 = require('./v1')

router.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        msg: 'welcome to express mysql boilerplate'
    })
})
router.use('/v1', v1)

module.exports = router