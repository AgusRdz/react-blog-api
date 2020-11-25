const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const { create } = require('../middlewares/users')

router.route('/users').get(user.index).post(create, user.store)
router.route('/users/:id').put(user.update).delete(user.destroy)

module.exports = router
