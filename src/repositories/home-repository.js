const { Blog } = require('../models/blog')

const getAll = async (limit, page) => {
  return await Blog.find({
    status: 'published'
  })
    .limit(limit)
    .skip(page * limit)
    .sort({ createdAt: 'desc' })
}

module.exports.HomeRepository = { getAll }
