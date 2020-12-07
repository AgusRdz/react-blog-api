const Joi = require('joi')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const config = require('../config/config')

const getAccessToken = (authorization) =>
  authorization.replace(/bearer/gi, '').trim()

exports.jwtValidate = (req, res, next) => {
  const schema = Joi.object({
    authorization: Joi.string().required()
  }).options({ stripUnknown: true })
  const { error } = schema.validate(req.headers)

  if (error) {
    const message = error.details.map(({ message }) => message)

    return res.formatter.unauthorized(message)
  }

  const token = req.sanitize(req.headers.authorization)
  const accessToken = getAccessToken(token)
  const privateKey = fs.readFileSync(config.privateKeyPath)
  jwt.verify(accessToken, privateKey, (err, decoded) => {
    if (err && err.name === 'TokenExpiredError') {
      return res.formatter.unauthorized(err)
    }

    if (err && err.name === 'JsonWebTokenError') {
      return res.formatter.serverError(err)
    }

    req.headers.authorization = token
    req.headers.session_id = decoded.user._id
    next()
  })
}

exports.refreshJwtRequest = (req, res, next) => {
  const schema = Joi.object({
    authorization: Joi.string().required()
  }).options({ stripUnknown: true })
  const { error } = schema.validate(req.headers)

  if (error) {
    const message = error.details.map(({ message }) => message)

    return res.formatter.serverError(message)
  }

  const token = req.sanitize(req.headers.authorization)
  req.body.oldAccessToken = getAccessToken(token)
  next()
}
