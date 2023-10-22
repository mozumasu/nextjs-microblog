import { client } from '@lib/microCMS'
import type { Blog } from '~types/microCMS'

//ブログ一覧取得
export const getBlogs = async (): Promise<Blog[]> => {
  const blog = await client.get({
    endpoint: 'blogs',
  })

  return blog.contents
}

//動的ルーティングのURLを取得
export async function getBlogIds(): Promise<string[]> {
  const blog = await client.get({
    endpoint: 'blogs',
  })

  return blog.contents.map((content) => content.id)
}

//idに基づいてブログ投稿用データを返す
export async function getBlogById(id: string): Promise<Blog> {
  const blog = await client.get({
    endpoint: 'blogs',
    queries: {
      ids: id,
    },
  })
  const blogContent = blog.contents[0]

  return blogContent
}
