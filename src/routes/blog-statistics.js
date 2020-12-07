const express = require('express')
const { jwtValidate } = require('../middlewares/auth')
const router = express.Router()
const { index } = require('../controllers/blog-statistics')
const { filterRequest } = require('../middlewares/blog-statistic')

router.route('/statistics/blogs').get(jwtValidate, filterRequest, index)

module.exports = router
