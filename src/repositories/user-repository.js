const { User } = require('../models/user')

const create = async (data) => await User.create(data)

const findOne = async (where) => await User.findOne(where)

module.exports.UserRepository = {
  create,
  findOne
}
