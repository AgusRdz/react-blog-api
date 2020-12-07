const express = require('express')
const router = express.Router()
const { index, latest } = require('../controllers/home')
const { homeRequest } = require('../middlewares/home')

router.get('/home', homeRequest, index)
router.get('/home/latest', latest)

module.exports = router
