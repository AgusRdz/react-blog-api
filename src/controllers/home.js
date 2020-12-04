const { BlogRepository } = require('../repositories/blog-repository')
const { HomeRepository } = require('../repositories/home-repository')

module.exports.index = async (req, res) => {
  const {
    query: { page }
  } = req
  const limit = 9
  const total = await BlogRepository.count({ status: 'published' })
  const blogs = await HomeRepository.getAll(limit, page)
  const hasNext = page < Math.round(total / 9) - 1

  return res.formatter.ok({ blogs, total, hasNext })
}
