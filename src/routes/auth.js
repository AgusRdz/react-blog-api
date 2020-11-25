const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const { refreshJwtRequest } = require('../middlewares/auth')
const { loginRequest } = require('../middlewares/login')

router.post('/login', loginRequest, auth.login)
router.post('/token/refresh', refreshJwtRequest, auth.tokenRefresh)
router.use('/auth', router)

module.exports = router
