import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '@/components/Layout'
import { formatDate, getBlogs } from '@/lib/post'
import utilStyle from '@/styles/utils.module.css'
import styles from '@/styles/home.module.css'
import type { Blog } from '@/types/microCMS'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = await getBlogs()
  const formattedAllPostsData = allPostsData.map((contents) => {
    return {
      ...contents,
      updatedAt: formatDate(contents.updatedAt), //更新日付をフォーマット
    }
  })

  return {
    props: {
      allPostsData: formattedAllPostsData,
    },
  }
}

export default function Home({ allPostsData }: { allPostsData: Blog[] }) {
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
        <h2>😼技術ブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, updatedAt, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  src={thumbnail.url}
                  className={styles.thumbnailImage}
                  alt="サムネイル"
                  width={300}
                  height={300}
                />
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
  )
}
