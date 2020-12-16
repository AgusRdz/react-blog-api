import express from 'express'
import { login, tokenRefresh } from '../controllers/auth'
import { AuthRequest } from '../middlewares/auth'
import { LoginRequest } from '../middlewares/login'
const router = express.Router()

router.post('/auth/login', LoginRequest.login, login)
router.post('/auth/token/refresh', AuthRequest.refreshJwtRequest, tokenRefresh)

module.exports = router
