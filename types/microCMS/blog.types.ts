//ブログ単品
export type Blog = {
  body: string
  createAt: string
  description: string
  id: string
  publishedAt: string
  revisedAt: string
  thumbnail: BlogThumbnail
  title: string
  updatedAt: string
}
//APIを叩いたときに返ってくるデータ
export type BlogApiResponse = {
  contents: Blog[]
  limit: number
  offset: number
  totalCount: number
}

//ブログのThumbnail
export type BlogThumbnail = {
  url: string
  height: number
  width: number
}
