import Joi from 'joi'
import fs from 'fs'
import { config } from '../config/config'
const jwt = require('jsonwebtoken')

const getAccessToken = (authorization: string) =>
  authorization.replace(/bearer/gi, '').trim()

export const AuthRequest = {
  jwtValidate: (req: any, res: any, next: () => void) => {
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
    jwt.verify(
      accessToken,
      privateKey,
      (err: { name: string }, decoded: { user: { _id: any } }) => {
        if (err && err.name === 'TokenExpiredError') {
          return res.formatter.unauthorized(err)
        }

        if (err && err.name === 'JsonWebTokenError') {
          return res.formatter.serverError(err)
        }

        req.headers.authorization = token
        req.headers.sessionId = decoded.user._id
        next()
      }
    )
  },
  refreshJwtRequest: (req: any, res: any, next: () => void) => {
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
}
