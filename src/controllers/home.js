const { Blog } = require('../models/blog')

module.exports.index = async (req, res) => {
  const {
    query: { page }
  } = req
  const limit = 9

  const total = await Blog.countDocuments({
    status: 'published'
  })
  const blogs = await Blog.find({
    status: 'published'
  })
    .limit(limit)
    .skip(page * limit)
  const hasNext = page < Math.round(total / 9) - 1

  return res.formatter.ok({ blogs, total, hasNext })
}
