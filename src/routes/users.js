const express = require('express')
const router = express.Router()
const { index, update, store, destroy } = require('../controllers/user')
const { createRequest } = require('../middlewares/users')

router.route('/users').get(index).post(createRequest, store)
router.route('/users/:id').put(update).delete(destroy)

module.exports = router
