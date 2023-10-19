import path from 'path';
import fs, { readFileSync } from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { client } from '../lib/microCMS';
//dangerouslySetInnerHTMLがうまく機能しないため下記を追加
// import remarkParse from 'remark-parse';
// import { unified } from 'unified';

//mdファイルが格納されたディレクトリのパス取得
const postsDirectory = path.join(process.cwd(), 'posts');

//mdファイルのデータを取得(トップページ表示用)
export const getPostsData = async (id) => {
  const blog = await client.get({
    endpoint: 'blogs',
    queries: {
      ids: id,
    },
  });

  return blog;
  // const fileNames = fs.readdirSync(postsDirectory);
  // const allPostsData = fileNames.map((fileName) => {
  //   const id = fileName.replace(/\.md$/, ''); //ファイル名(URLのid)
  //   //マークダウンファイルを文字列として読み取る
  //   const fullPath = path.join(postsDirectory, fileName);
  //   const fileContents = readFileSync(fullPath, 'utf8');
  //   //メタデータの取得
  //   const matterResult = matter(fileContents);
  //   //idとデータを返す
  //   return {
  //     id,
  //     ...matterResult.data,
  //   };
  // });
  // return allPostsData;
};

//getStaticPathsで使用する動的ルーティングのURLを取得
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''), //ファイル名(URLのid)
      },
    };
  });
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

  //md
  // const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContent = fs.readFileSync(fullPath, 'utf8');
  // //解析
  // const matterResult = matter(fileContent);
  // //remarkで解析し、本文をHTML形式に変換
  // const blogContent = await remark().use(html).process(matterResult.content);
  // // const blogContent = await unified()
  // //   .use(remarkParse)
  // //   .use(html)
  // //   .process(matterResult.content);
  // // const blogContent = await unified()
  // //   .use(remarkParse)
  // //   .use(html)
  // //   .process(matterResult.content);
  // const blogContentHTML = blogContent.toString();
  // return {
  //   id,
  //   blogContentHTML,
  //   ...matterResult.data,
  // };
}
