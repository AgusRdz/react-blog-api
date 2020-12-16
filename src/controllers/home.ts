import { BlogRepository } from '../repositories/blog-repository'
import { HomeRepository } from '../repositories/home-repository'

export const index = async (req: any, res: any) => {
  const {
    query: { page }
  } = req
  const limit = 9
  const total = await BlogRepository.count({ status: 'published' })
  const blogs = await HomeRepository.getAll(limit, page)
  const hasNext = page < Math.round(total / 9) - 1

  return res.formatter.ok({ blogs, total, hasNext })
}

export const latest = async (req: any, res: any) => {
  const blogs = await HomeRepository.getAll(5, 0)
  return res.formatter.ok({ blogs })
}
