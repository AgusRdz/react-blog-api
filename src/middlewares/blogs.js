const Joi = require('joi')

exports.filterRequest = (req, res, next) => {
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

exports.createRequest = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    cover: Joi.string().optional().allow(''),
    content: Joi.string().optional().allow(''),
    status: Joi.string().required(),
    description: Joi.string().required().max(100)
  })

  const { error } = schema.validate(req.body)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  next()
}

exports.updateRequest = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required().max(100),
    cover: Joi.string().optional().allow(''),
    content: Joi.string().optional().allow(''),
    status: Joi.string().required(),
    description: Joi.string().required().max(100)
  })
  const { error } = schema.validate({ ...req.body, ...req.params })

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  next()
}

exports.editRequest = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  const { error } = schema.validate(req.params)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess({ message })
  }

  next()
}

exports.deleteRequest = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  const { error } = schema.validate(req.params)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess({ message })
  }

  next()
}
