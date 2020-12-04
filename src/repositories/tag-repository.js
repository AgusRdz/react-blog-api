const { Tag } = require('../models/tag')

const count = async (where = {}) => {
  return await Tag.countDocuments(where)
}

const create = async (data) => {
  return await Tag.create(data)
}

const getAll = async (fields) => await Tag.find().select(fields)

module.exports.TagRepository = { count, create, getAll }
