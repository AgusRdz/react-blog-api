const express = require('express')
const router = express.Router()
const { index } = require('../controllers/home')
const { homeRequest } = require('../middlewares/home')

router.get('/home', homeRequest, index)

module.exports = router
