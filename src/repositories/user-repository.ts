import IUser from 'interfaces/user'
import { User } from '../models/user'

export const UserRepository = {
  create: async (data: IUser) => await User.create(<Object>data),
  findOne: async (where: Object) => await User.findOne(where)
}
