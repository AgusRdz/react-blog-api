import { BlogStatisticsRepository } from '../repositories/blog-statistics-repository'

export const index = async (req: any, res: any) => {
  const {
    query: { status = '' }
  } = req

  const total = await BlogStatisticsRepository.count(status)

  return res.formatter.ok({ total })
}
