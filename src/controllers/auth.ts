import { config } from '../config/config'
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { UserRepository } = require('../repositories/user-repository')
console.log(config)
export const login = async (req: any, res: any) => {
  const {
    body: { email, password }
  } = req
  const invalidCredentials = { message: 'User or password does not match' }
  const user = await UserRepository.findOne({ email })

  if (!user) return res.formatter.badRequest(invalidCredentials)

  compare(password, user.password, function (err: any, result: any) {
    if (err || !result) return res.formatter.badRequest(invalidCredentials)

    const privateKey = fs.readFileSync(config.privateKeyPath)
    const accessToken = jwt.sign({ user }, privateKey, {
      expiresIn: 3600
    })
    return res.formatter.ok({ accessToken, user })
  })
}

export const tokenRefresh = async (req: any, res: any) => {
  const {
    body: { oldAccessToken }
  } = req
  const { user } = jwt.decode(oldAccessToken)
  const privateKey = fs.readFileSync(config.privateKeyPath)
  const accessToken = jwt.sign({ user }, privateKey, { expiresIn: 3600 })
  return res.formatter.ok({ accessToken })
}
