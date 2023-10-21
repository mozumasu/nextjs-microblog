import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout';
import { getPostsData } from '../../lib/post';

import utilStyle from '../styles/utils.module.css';
import styles from '../styles/home.module.css';

//SSGの場合
export async function getStaticProps() {
  // const allPostData = getPostData()
  const allPostsData = await getPostsData();
  console.log(allPostsData);

  return {
    props: {
      // TODO : 動的に変更
      // allPostsData: ['test1'],
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  // console.log(allPostsData);
  console.log(allPostsData.contents);
  // console.log(allPostsData.contents.id);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          フルスタックエンジニアを目指して勉強＆転職活動中
          <br />
          /TypeScript/Next.js/Node.js/TailwindCSS
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.contents.map(({ id, title, updatedAt }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                {/* <img src={thumbnail} className={styles.thumbnailImage} /> */}
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{updatedAt}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
