const express = require('express')
const router = express.Router()
const { index, store, destroy, update, edit } = require('../controllers/blog')
const { jwtValidate } = require('../middlewares/auth')
const {
  createRequest,
  updateRequest,
  filterRequest,
  editRequest,
  deleteRequest
} = require('../middlewares/blogs')

router
  .route('/blogs')
  .all(jwtValidate)
  .get(filterRequest, index)
  .post(createRequest, store)

router
  .route('/blogs/:id')
  .all(jwtValidate)
  .get(editRequest, edit)
  .put(updateRequest, update)
  .delete(deleteRequest, destroy)

module.exports = router
