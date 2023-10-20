import Head from 'next/head';
import Layout from '../../../components/Layout';
import { getAllPostIds, getPostData } from '../../../lib/post';
import utilStyles from '../../styles/utils.module.css';

//URLの動的に変わる部分のパスを返す
export async function getStaticPaths() {
  const ids = await getAllPostIds();
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false, //CMS上にデータがない場合404
  };
}

//SSG
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData: postData.contents[0],
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h1 className={utilStyles.headingXl}>{postData.description}</h1>
      </article>
    </Layout>
  );
}
