const { Tag } = require('../models/tag')

exports.index = async (req, res) => {
  const tags = await Tag.find().select('name')

  return res.formatter.ok({ tags: tags.map(({ name }) => name) })
}
