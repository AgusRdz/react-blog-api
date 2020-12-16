import IBlog from 'interfaces/blog'
import { Blog } from '../models/blog'

const filter = async (page: number) => {
  const limit = 10
  return await Blog.find({ status: { $ne: 'deleted' } })
    .limit(limit)
    .skip(page * limit)
    .sort({
      createdAt: 'desc'
    })
}

const count = async (where: Object = {}) => await Blog.countDocuments(where)

const create = async (data: IBlog) => await Blog.create(<Object>data)

const update = async (id: string, data: IBlog) =>
  await Blog.updateOne({ _id: id }, <Object>data)

const destroy = async (id: string) => await Blog.deleteOne({ _id: id })

const findById = async (id: string) => await Blog.findById(id)

const findOne = async (where: Object) => await Blog.findOne(where)

const findOneWith = async (where: Object, populate: any) =>
  await Blog.findOne(where).populate(populate.path, populate.select)

const find = async (where: Object) => await Blog.findOne(where)

export const BlogRepository = {
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
