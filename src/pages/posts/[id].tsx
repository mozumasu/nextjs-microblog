import Layout from '../../../components/Layout';
import { getAllPostIds, getPostData } from '../../../lib/post';
import utilStyles from '../../styles/utils.module.css';

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
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        {postData.blogContentHTML}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
