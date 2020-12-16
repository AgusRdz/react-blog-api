import express from 'express'
import { index } from '../controllers/tag'
const router = express.Router()

router.route('/tags').get(index)

module.exports = router
