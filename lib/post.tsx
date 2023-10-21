import { client } from '../lib/microCMS';

//ブログ一覧取得
export const getPostsData = async () => {
  const blog = await client.get({
    endpoint: 'blogs',
  });

  return blog;
};

//動的ルーティングのURLを取得
export async function getAllPostIds() {
  const blog = await client.get({
    endpoint: 'blogs',
  });

  return blog.contents.map((content) => content.id);
}

//idに基づいてブログ投稿用データを返す
export async function getPostData(id) {
  const blog = await client.get({
    endpoint: 'blogs',
    queries: {
      ids: id,
    },
  });

  return blog;
}
