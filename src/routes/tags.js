const express = require('express')
const { index } = require('../controllers/tag')
const router = express.Router()

router.route('/tags').get(index)

module.exports = router
