const { Blog } = require('../models/blog')
const { Tag } = require('../models/tag')
const { BlogRepository } = require('../repositories/blog-repository')

exports.index = async (req, res) => {
  const {
    query: { page }
  } = req

  const blogs = await BlogRepository.filter(page)
  const total = await BlogRepository.countAll()

  return res.formatter.ok({ blogs, total, page })
}

exports.store = async (req, res) => {
  const {
    body: { title, content, description, status, category, tags },
    headers: { session_id: author }
  } = req

  try {
    const publishedAt = status === 'published' ? Date.now() : null
    tags.forEach(async (name) => {
      const exists = await Tag.count({ name: name.toLowerCase() })
      if (exists === 0) {
        await Tag.create({ name: name.toLowerCase() })
      }
    })
    const blog = await Blog.create({
      title,
      content,
      author,
      description,
      status,
      category,
      publishedAt,
      tags
    })

    return res.formatter.created({ blog })
  } catch (error) {
    return res.formatter.serverError(error)
  }
}

exports.update = async (req, res) => {
  const {
    params: { id },
    body: { title, description, status, content, category, tags }
  } = req
  const publishedAt = status === 'published' ? Date.now() : null
  tags.forEach(async (name) => {
    const exists = await Tag.count({ name: name.toLowerCase() })
    if (exists === 0) {
      await Tag.create({ name: name.toLowerCase() })
    }
  })

  const blog = await Blog.updateOne(
    { _id: id },
    {
      title,
      description,
      status,
      content,
      category,
      publishedAt,
      tags
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

exports.show = async (req, res) => {
  const {
    params: { slug }
  } = req
  const blog = await Blog.findOne({ slug })

  return res.formatter.ok({ blog })
}
