import { TagRepository } from '../repositories/tag-repository'

export const index = async (req: any, res: any) => {
  const tags = await TagRepository.getAll('name')

  return res.formatter.ok({ tags: tags.map((tag: any) => tag.name) })
}
