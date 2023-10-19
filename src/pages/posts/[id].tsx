import Head from 'next/head';
import Layout from '../../../components/Layout';
import { getAllPostIds, getPostData } from '../../../lib/post';
import utilStyles from '../../styles/utils.module.css';

//URLの動的に変わる部分のパスを返し、pathsに含まれないパスは404ページを表示
export async function getStaticPaths() {
  const ids = await getAllPostIds();

  const paths = ids.map((id) => {
    return {
      params: {
        id: id,
      },
    };
  });

  return {
    paths,
    // params: paths,
    // paths: [{ params: { id: 'test1' } }, { params: { id: 'test2' } }],

    fallback: false,
  };
}

//getStaticPathsを使用するため記述
export async function getStaticProps({ params }) {
  //CMSから取得
  //開いたIDで取得する編集
  // const postData = await getPostData('test1');
  const postData = await getPostData(params.id);
  console.log(postData);

  // const postData = await getPostData(params.id);

  return {
    props: {
      // postData: postData.contents[0],
      postData,
    },
  };
}

export default function Post({ postData }) {
  console.log(postData);

  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.contents[0].title}</h1>
        <h1 className={utilStyles.headingXl}>
          {postData.contents[0].description}
        </h1>
        {/* <div className={utilStyles.lightText}>{postData.date}</div>
        <div>{postData.blogContentHTML} </div> */}

        {/* <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} /> */}
      </article>
    </Layout>
  );
}
