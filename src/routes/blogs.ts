import express from 'express'
import {
  index,
  store,
  destroy,
  update,
  edit,
  archive,
  show
} from '../controllers/blog'
import { AuthRequest } from '../middlewares/auth'
import { BlogRequest } from '../middlewares/blogs'
const router = express.Router()

router
  .route('/blogs')
  .all(AuthRequest.jwtValidate)
  .get(BlogRequest.filter, index)
  .post(BlogRequest.create, store)

router
  .route('/blogs/:id')
  .all(AuthRequest.jwtValidate)
  .get(BlogRequest.edit, edit)
  .put(BlogRequest.update, update)
  .delete(BlogRequest.destroy, destroy)

router
  .route('/blogs/:id/archive')
  .delete(AuthRequest.jwtValidate, BlogRequest.destroy, archive)

router.route('/blogs/:slug/show').get(BlogRequest.show, show)

module.exports = router
