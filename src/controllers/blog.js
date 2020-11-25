const { Blog } = require('../models/blog')

exports.index = async (req, res) => {
  const {
    query: { page }
  } = req
  const limit = 10
  const total = await Blog.countDocuments()
  const blogs = await Blog.find()
    .limit(limit)
    .skip(page * limit)

  return res.formatter.ok({ blogs, total, page })
}

exports.store = async (req, res) => {
  const {
    body: { title, cover, content },
    headers: { session_id: author }
  } = req

  try {
    const blog = await Blog.create({ title, cover, content, author })

    return res.formatter.created({ blog })
  } catch (error) {
    return res.formatter.serverError(error)
  }
}

exports.update = async (req, res) => {}

exports.destroy = async (req, res) => {}
