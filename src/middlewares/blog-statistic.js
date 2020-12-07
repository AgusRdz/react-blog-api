const Joi = require('joi')

exports.filterRequest = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().optional().allow('')
  })
  const { error } = schema.validate(req.query)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  req.query.status = req.sanitize(req.query.status)
  next()
}
