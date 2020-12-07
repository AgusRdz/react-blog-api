const { Blog } = require('../models/blog')

const count = async (status) => {
  let where = {}

  if (status) {
    where = {
      status
    }
  }
  return await Blog.countDocuments(where)
}

module.exports.BlogStatisticsRepository = { count }
