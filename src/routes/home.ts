import express from 'express'
import { index, latest } from '../controllers/home'
import { HomeRequest } from '../middlewares/home'
const router = express.Router()

router.get('/home', HomeRequest.index, index)
router.get('/home/latest', latest)

module.exports = router
