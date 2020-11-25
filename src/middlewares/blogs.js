const Joi = require('joi')

exports.filterRequest = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().required()
  })
  const { error } = schema.validate(req.query)

  if (error) {
    return res.formatter.unprocess(error)
  }

  next()
}

exports.createRequest = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50),
    cover: Joi.string().optional().allow(''),
    content: Joi.string().required(),
    status: Joi.string().required()
  })

  const { error } = schema.validate(req.body)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  next()
}
