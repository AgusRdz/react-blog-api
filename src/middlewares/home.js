const Joi = require('joi')

exports.homeRequest = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().required()
  })
  const { error } = schema.validate(req.query)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  next()
}
