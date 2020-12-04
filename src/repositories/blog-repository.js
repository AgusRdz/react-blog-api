const { Blog } = require('../models/blog')

const filter = async (page) => {
  const limit = 10
  return await Blog.find({ status: { $ne: 'deleted' } })
    .limit(limit)
    .skip(page * limit)
    .sort({
      createdAt: 'desc'
    })
}

const count = async (where = {}) => await Blog.countDocuments(where)

const create = async (data) => await Blog.create(data)

const update = async (id, data) => await Blog.updateOne({ _id: id }, data)

const destroy = async (id) => await Blog.deleteOne({ _id: id })

const findById = async (id) => await Blog.findById(id)

const findOne = async (where) => await Blog.findOne(where)

const findOneWith = async (where, populate) =>
  await Blog.findOne(where).populate(populate.path, populate.select)

const find = async (where) => await Blog.findOne(where)

module.exports.BlogRepository = {
  filter,
  count,
  create,
  update,
  destroy,
  findById,
  findOne,
  findOneWith,
  find
}
