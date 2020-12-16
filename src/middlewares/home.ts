import Joi from 'joi'

export const HomeRequest = {
  index: (req: any, res: any, next: () => void) => {
    const schema = Joi.object({
      page: Joi.number().required()
    })
    const { error } = schema.validate(req.query)

    if (error) {
      const message = error.details.map((e: any) => e.message).join(',')

      return res.formatter.unprocess(message)
    }

    req.query.page = req.sanitize(req.query.page)
    next()
  }
}
