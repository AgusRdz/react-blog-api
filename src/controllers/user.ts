import { UserRepository } from '../repositories/user-repository'

export const index = (req: any, res: any) => {}

export const store = async (req: any, res: any) => {
  const { body } = req
  const user = await UserRepository.create(body)

  return res.formatter.created({ user })
}

export const update = (req: any, res: any) => {}

export const destroy = (req: any, res: any) => {}
