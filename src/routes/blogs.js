const express = require('express')
const router = express.Router()
const { index, store } = require('../controllers/blog')
const { jwtValidate } = require('../middlewares/auth')
const { createRequest, filterRequest } = require('../middlewares/blogs')

router
  .route('/blogs')
  .all(jwtValidate)
  .get(filterRequest, index)
  .post(createRequest, store)

module.exports = router
