import { Blog } from '../models/blog'

export const BlogStatisticsRepository = {
  count: async (status: any) => {
    let where = {}

    if (status) {
      where = {
        status
      }
    }
    return await Blog.countDocuments(where)
  }
}
