import Head from 'next/head'
import Layout from '../../../components/Layout'
import { getBlogIds, getBlogById } from '../../../lib/post'
import utilStyles from '../../styles/utils.module.css'
import type { Blog } from '../../../types/microCMS'
import Image from 'next/image'

//URLの動的に変わる部分のパスを返す
export async function getStaticPaths() {
  const ids = await getBlogIds()
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
    fallback: false, //CMS上にデータがない場合404
  }
}

//SSG
export async function getStaticProps({ params }) {
  const postData = await getBlogById(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }: { postData: Blog }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <Image
          src={postData.thumbnail.url}
          alt="サムネイル"
          width={300}
          height={300}
        />
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h1 className={utilStyles.headingXl}>{postData.description}</h1>
        <div
          className="blogBody"
          dangerouslySetInnerHTML={{ __html: postData.body }}
        />
      </article>
    </Layout>
  )
}
