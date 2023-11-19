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
    <Layout home thumbnail={false}>
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
      <div
        id="contact"
        className="container mt-52 mb-20 flex justify-between items-center mx-auto px-8 md:px-14 lg-24 w-full"
      >
        <section className="w-full">
          <h2 className="text-white font-bold text-2xl">プロフィール</h2>
          <p className="section-paragraph">
            私の経歴が気になる方はご一報ください。即時対応します。
          </p>
          <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-32 mt-16">
            <div className="space-y-12">
              <div>
                <label className="text-white block mb-6 text-xl font-bold">
                  お名前
                </label>
                <input
                  type="text"
                  className="w-full border border-inputBorder bg-input px-4 py-4"
                />
              </div>
              <div>
                <label className="text-white block mb-6 text-xl font-bold">
                  メールアドレス
                </label>
                <input
                  type="emial"
                  className="w-full border border-inputBorder bg-input px-4 py-4"
                />
              </div>
              <div>
                <label className="text-white block mb-6 text-xl font-bold">
                  メッセージ
                </label>
                <input
                  type="message"
                  className="w-full border border-inputBorder bg-input px-4 py-4"
                />
              </div>
              <button className="px-8 py-3 bg-theme font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 mt-10">
                <span>送信する</span>
              </button>
            </div>
            <div>
              <p className="text-secoundary">000-0000-0000</p>
              <a href="mailto:ouri1229@gmail.com">mozumasu@gmail.com</a>
              <div className="mt-20 space-x-6">
                <a href="#">
                  <i className="fa-brands fa-twitter text-3xl text-blue-400"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-facebook text-3xl text-blue-600"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram text-3xl text-pink-400"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="rounded-[10px] bg-white/75 p-4 !pt-20 sm:p-6">
          <time datetime="2022-10-10" className="block text-xs text-gray-500">
            10th Oct 2022
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900">
              How to center an element using JavaScript and jQuery
            </h3>
          </a>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
              Snippet
            </span>

            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
              JavaScript
            </span>
          </div>
        </div>
      </article> */}
    </Layout>
  )
}
