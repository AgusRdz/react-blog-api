const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

exports.login = async (req, res) => {
  const {
    body: { email, password }
  } = req
  const invalidCredentials = { message: 'User or password does not match' }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.formatter.serverError(
        'Whoops looks like something went wrong :('
      )
    }

    if (!user) {
      return res.formatter.badRequest(invalidCredentials)
    }

    compare(password, user.password, function (err, result) {
      if (err || !result) return res.formatter.badRequest(invalidCredentials)

      const accessToken = jwt.sign({ user }, 'thisisaseed', { expiresIn: 3600 })
      res.formatter.ok({ accessToken, user })
    })
  })
}

exports.tokenRefresh = async (req, res) => {
  const {
    body: { oldAccessToken }
  } = req
  const { user } = jwt.decode(oldAccessToken)
  const accessToken = jwt.sign({ user }, 'thisisaseed', { expiresIn: 3600 })
  res.formatter.ok({ accessToken })
}
