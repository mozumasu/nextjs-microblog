import Layout from '../../../components/Layout';
import { getAllPostIds, getPostData } from '../../../lib/post';

//URLの動的に変わる部分のパスを返し、pahtsに含まれないパスは404ページを表示
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

//getStaticPathsを使用するため記述
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.date}
      <br />
      {postData.blogContentHTML}
    </Layout>
  );
}
