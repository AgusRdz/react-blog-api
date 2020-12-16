import Joi from 'joi'

export const LoginRequest = {
  login: (req: any, res: any, next: any) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    const { error } = schema.validate(req.body)

    if (error) {
      const message = error.details.map((i: any) => i.message).join(',')

      return res.formatter.unprocess(message)
    }

    req.body.email = req.sanitize(req.body.email)
    req.body.password = req.sanitize(req.body.password)
    next()
  }
}
