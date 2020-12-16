import express from 'express'
import { AuthRequest } from '../middlewares/auth'
import { index } from '../controllers/blog-statistics'
import { BlogStatisticRequest } from '../middlewares/blog-statistic'
const router = express.Router()

router
  .route('/statistics/blogs')
  .get(AuthRequest.jwtValidate, BlogStatisticRequest.filter, index)

module.exports = router
