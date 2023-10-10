import path from 'path';
import fs, { readFileSync } from 'fs';
import matter from 'gray-matter';
const postsDirectory = path.join(process.cwd(), 'posts');

//mdファイルのデータを取得
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ''); //ファイル名(URLのid)

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');
    //メタデータの取得
    const matterResult = matter(fileContents);

    //idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}
