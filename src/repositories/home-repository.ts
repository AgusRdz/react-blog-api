import { Blog } from '../models/blog'

export const HomeRepository = {
  getAll: async (limit: Number, page: Number) => {
    return await Blog.find({
      status: 'published'
    })
      .limit(+limit)
      .skip(+page * +limit)
      .sort({ createdAt: 'desc' })
  }
}
