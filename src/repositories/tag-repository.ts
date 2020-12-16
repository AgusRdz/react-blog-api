import ITag from 'interfaces/tag'
import { Tag } from '../models/tag'

export const TagRepository = {
  count: async (where = {}) => {
    return await Tag.countDocuments(where)
  },
  create: async (data: ITag) => {
    return await Tag.create(<Object>data)
  },
  getAll: async (fields: any) => await Tag.find().select(fields)
}
