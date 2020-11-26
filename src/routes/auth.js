const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const { refreshJwtRequest } = require('../middlewares/auth')
const { loginRequest } = require('../middlewares/login')

router.post('/auth/login', loginRequest, auth.login)
router.post('/auth/token/refresh', refreshJwtRequest, auth.tokenRefresh)

module.exports = router
