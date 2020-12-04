const { Blog } = require('../models/blog')

const filter = async (page) => {
  const limit = 10
  return await Blog.find({ status: { $ne: 'deleted' } })
    .limit(limit)
    .skip(page * limit)
    .sort({
      createdAt: 'desc'
    })
}

const countAll = async () => await Blog.countDocuments()

module.exports.BlogRepository = { filter, countAll }
