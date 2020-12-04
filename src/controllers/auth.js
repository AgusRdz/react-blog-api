const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const config = require('../config/config')
const { UserRepository } = require('../repositories/user-repository')

exports.login = async (req, res) => {
  const {
    body: { email, password }
  } = req
  const invalidCredentials = { message: 'User or password does not match' }
  const user = await UserRepository.findOne({ email })

  if (!user) return res.formatter.badRequest(invalidCredentials)

  compare(password, user.password, function (err, result) {
    if (err || !result) return res.formatter.badRequest(invalidCredentials)

    const privateKey = fs.readFileSync(config.privateKeyPath)
    const accessToken = jwt.sign({ user }, privateKey, {
      expiresIn: 3600
    })
    return res.formatter.ok({ accessToken, user })
  })
}

exports.tokenRefresh = async (req, res) => {
  const {
    body: { oldAccessToken }
  } = req
  const { user } = jwt.decode(oldAccessToken)
  const privateKey = fs.readFileSync(config.privateKeyPath)
  const accessToken = jwt.sign({ user }, privateKey, { expiresIn: 3600 })
  return res.formatter.ok({ accessToken })
}
