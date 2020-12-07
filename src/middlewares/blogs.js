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

  req.query.page = req.sanitize(req.query.page)
  next()
}

exports.createRequest = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    cover: Joi.string().optional().allow(''),
    content: Joi.string().optional().allow(''),
    status: Joi.string().required(),
    description: Joi.string().required().max(100),
    category: Joi.string().required(),
    tags: Joi.array().optional()
  })

  const { error } = schema.validate(req.body)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  req.body.title = req.sanitize(req.body.title)
  req.body.cover = req.sanitize(req.body.cover)
  req.body.content = req.sanitize(req.body.content)
  req.body.status = req.sanitize(req.body.status)
  req.body.description = req.sanitize(req.body.description)
  req.body.category = req.sanitize(req.body.category)
  req.body.tags = req.sanitize(req.body.tags).split(',')
  next()
}

exports.updateRequest = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required().max(100),
    cover: Joi.string().optional().allow(''),
    content: Joi.string().optional().allow(''),
    status: Joi.string().required(),
    description: Joi.string().required().max(100),
    category: Joi.string().required(),
    tags: Joi.array().optional()
  })

  const { error } = schema.validate({ ...req.body, ...req.params })

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess(message)
  }

  req.params.id = req.sanitize(req.params.id)
  req.body.title = req.sanitize(req.body.title)
  req.body.cover = req.sanitize(req.body.cover)
  req.body.content = req.sanitize(req.body.content)
  req.body.status = req.sanitize(req.body.status)
  req.body.description = req.sanitize(req.body.description)
  req.body.category = req.sanitize(req.body.category)
  req.body.tags = req.sanitize(req.body.tags).split(',')
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

  req.params.id = req.sanitize(req.params.id)
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

  req.params.id = req.sanitize(req.params.id)
  next()
}

exports.showRequest = (req, res, next) => {
  const schema = Joi.object({
    slug: Joi.string().required()
  })

  const { error } = schema.validate(req.params)

  if (error) {
    const message = error.details.map(({ message }) => message).join(',')

    return res.formatter.unprocess({ message })
  }

  req.params.slug = req.sanitize(req.params.slug)
  next()
}
