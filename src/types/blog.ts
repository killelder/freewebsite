export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  rawContent?: string
  date: string
}

export interface BlogMeta {
  title?: string
  description?: string
  keywords?: string[]
}