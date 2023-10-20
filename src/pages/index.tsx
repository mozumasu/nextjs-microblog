import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout';
import { getPostsData } from '../../lib/post';

import utilStyle from '../styles/utils.module.css';
import styles from '../styles/home.module.css';

//SSGの場合
export async function getStaticProps() {
  return {
    props: {
      allPostsData: ['test1'],
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          フルスタックエンジニアを目指して勉強＆転職活動中です。/TypeScript、Next.js、Node.jsを勉強中です。
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
