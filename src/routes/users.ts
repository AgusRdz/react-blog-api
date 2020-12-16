import express from 'express'
import { index, update, store, destroy } from '../controllers/user'
import { UserRequest } from '../middlewares/users'
const router = express.Router()

router.route('/users').get(index).post(UserRequest.create, store)
router.route('/users/:id').put(update).delete(destroy)

module.exports = router
