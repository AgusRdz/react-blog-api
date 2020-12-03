const express = require('express')
const router = express.Router()
const {
  index,
  store,
  destroy,
  update,
  edit,
  archive,
  show
} = require('../controllers/blog')
const { jwtValidate } = require('../middlewares/auth')
const {
  createRequest,
  updateRequest,
  filterRequest,
  editRequest,
  deleteRequest,
  showRequest
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

router.route('/blogs/:id/archive').delete(jwtValidate, deleteRequest, archive)

router.route('/blogs/:slug/show').get(showRequest, show)

module.exports = router
