interface IBlog {
  title: string
  content: string
  description: string
  category: string
  publishedAt?: number | null
  tags?: string[]
  deletedAt?: number | null
  author?: any
  status: string
}

export default IBlog
