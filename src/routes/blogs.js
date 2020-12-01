const express = require('express')
const router = express.Router()
const {
  index,
  store,
  destroy,
  update,
  edit,
  archive
} = require('../controllers/blog')
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

router
  .route('/blogs/:id/archive')
  .all(jwtValidate)
  .delete(deleteRequest, archive)

module.exports = router
