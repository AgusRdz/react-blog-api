const Joi = require('joi')

exports.createRequest = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
  })
  const { error } = schema.validate(req.body)

  if (error) {
    const message = error.details.map((i) => i.message).join(',')

    return res.formatter.unprocess(message)
  }

  req.body.firstName = req.sanitize(req.body.firstName)
  req.body.lastName = req.sanitize(req.body.lastName)
  req.body.email = req.sanitize(req.body.email)
  req.body.password = req.sanitize(req.body.password)
  next()
}
