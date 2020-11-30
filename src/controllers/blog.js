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
    body: { title, content, description, status },
    headers: { session_id: author }
  } = req

  try {
    const randomImage = Math.floor(Math.random() * 10) + 1
    const cover = `/images/blogs/${randomImage}.jpg`
    const blog = await Blog.create({
      title,
      cover,
      content,
      author,
      description,
      status
    })

    return res.formatter.created({ blog })
  } catch (error) {
    return res.formatter.serverError(error)
  }
}

exports.update = async (req, res) => {
  const {
    params: { id },
    body: { title, description, status, content }
  } = req

  const blog = await Blog.findAndModify(id, {
    title,
    description,
    status,
    content
  })

  return res.formatter.ok({ blog })
}

exports.destroy = async (req, res) => {
  const {
    params: { id }
  } = req
  console.log('destroying: ', id)

  await Blog.updateOne(
    { _id: id },
    {
      deletedAt: Date.now(),
      status: 'archived'
    }
  )
  const blog = await Blog.findById(id)

  return res.formatter.ok({ blog })
}

exports.edit = async (req, res) => {
  const {
    params: { id }
  } = req
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.formatter.notFound('Resource you are looking for does not exist')
  }

  return res.formatter.ok({ blog })
}
