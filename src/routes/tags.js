const express = require('express')
const { index } = require('../controllers/tag')
const router = express.Router()
const { jwtValidate } = require('../middlewares/auth')

router.route('/tags').all(jwtValidate).get(index)

module.exports = router
