import IBlog from 'interfaces/blog'
import { BlogRepository } from '../repositories/blog-repository'
import { TagRepository } from '../repositories/tag-repository'

export const index = async (req: any, res: any) => {
  const {
    query: { page }
  } = req

  const blogs = await BlogRepository.filter(page)
  const total = await BlogRepository.count()

  return res.formatter.ok({ blogs, total, page })
}

export const store = async (req: any, res: any) => {
  const {
    body: { title, content, description, status, category, tags },
    headers: { session_id: author }
  } = req

  try {
    const publishedAt = status === 'published' ? Date.now() : null
    const blogData: IBlog = {
      title,
      content,
      author,
      description,
      status,
      category,
      publishedAt,
      tags
    }
    tags.forEach(async (name: string) => {
      const exists = await TagRepository.count({ name: name.toLowerCase() })
      if (exists === 0) {
        await TagRepository.create({ name: name.toLowerCase() })
      }
    })
    const blog = await BlogRepository.create(blogData)

    return res.formatter.created({ blog })
  } catch (error) {
    return res.formatter.serverError(error)
  }
}

export const update = async (req: any, res: any) => {
  const {
    params: { id },
    body: { title, description, status, content, category, tags }
  } = req
  const publishedAt = status === 'published' ? Date.now() : null
  const blogData: IBlog = {
    title,
    content,
    description,
    status,
    category,
    publishedAt,
    tags
  }
  tags.forEach(async (name: string) => {
    const exists = await TagRepository.count({ name: name.toLowerCase() })
    if (exists === 0) {
      await TagRepository.create({ name: name.toLowerCase() })
    }
  })

  const blog = await BlogRepository.update(id, blogData)

  return res.formatter.ok({ blog })
}

export const destroy = async (req: any, res: any) => {
  const {
    params: { id }
  } = req

  await BlogRepository.destroy(id)

  return res.formatter.ok()
}

export const edit = async (req: any, res: any) => {
  const {
    params: { id }
  } = req
  const blog = await BlogRepository.findById(id)

  if (!blog) {
    return res.formatter.notFound('Resource you are looking for does not exist')
  }

  return res.formatter.ok({ blog })
}

export const archive = async (req: any, res: any) => {
  const {
    params: { id }
  } = req

  await BlogRepository.update(id, <IBlog>{ status: 'archived' })

  const blog = await BlogRepository.findById(id)

  return res.formatter.ok({ blog })
}

export const show = async (req: any, res: any) => {
  const {
    params: { slug }
  } = req
  const blog = await BlogRepository.findOneWith(
    { slug },
    { path: 'author', select: 'firstName lastName' }
  )

  return res.formatter.ok({ blog })
}
