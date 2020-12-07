const {
  BlogStatisticsRepository
} = require('../repositories/blog-statistics-repository')

module.exports.index = async (req, res) => {
  const {
    query: { status = '' }
  } = req

  const total = await BlogStatisticsRepository.count(status)

  return res.formatter.ok({ total })
}
