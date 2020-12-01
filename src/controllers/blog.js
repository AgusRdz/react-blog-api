const { Blog } = require('../models/blog')

exports.index = async (req, res) => {
  const {
    query: { page }
  } = req
  const limit = 10
  const total = await Blog.countDocuments()
  const blogs = await Blog.find({ status: { $ne: 'deleted' } })
    .limit(limit)
    .skip(page * limit)
    .sort({
      createdAt: 'desc'
    })

  return res.formatter.ok({ blogs, total, page })
}

exports.store = async (req, res) => {
  const {
    body: { title, content, description, status, category },
    headers: { session_id: author }
  } = req

  try {
    const blog = await Blog.create({
      title,
      content,
      author,
      description,
      status,
      category
    })

    return res.formatter.created({ blog })
  } catch (error) {
    return res.formatter.serverError(error)
  }
}

exports.update = async (req, res) => {
  const {
    params: { id },
    body: { title, description, status, content, category }
  } = req

  const blog = await Blog.updateOne(
    { _id: id },
    {
      title,
      description,
      status,
      content,
      category
    }
  )

  return res.formatter.ok({ blog })
}

exports.destroy = async (req, res) => {
  const {
    params: { id }
  } = req

  await Blog.deleteOne({ _id: id })

  return res.formatter.ok()
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

exports.archive = async (req, res) => {
  const {
    params: { id }
  } = req

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
