const { UserRepository } = require('../repositories/user-repository')

exports.index = (req, res) => {}

exports.store = async (req, res) => {
  const { body } = req
  const user = await UserRepository.create(body)

  return res.formatter.created({ user })
}

exports.update = (req, res) => {}

exports.destroy = (req, res) => {}
