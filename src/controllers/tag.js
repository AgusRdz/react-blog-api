const { TagRepository } = require('../repositories/tag-repository')

exports.index = async (req, res) => {
  const tags = await TagRepository.getAll('name')

  return res.formatter.ok({ tags: tags.map(({ name }) => name) })
}
