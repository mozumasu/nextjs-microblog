import Head from 'next/head'
import Layout from '@/components/Layout'
import { getBlogIds, getBlogById } from '@/lib/post'
import utilStyles from '@/styles/utils.module.css'
import type { Blog } from '@/types/microCMS'
import Image from 'next/image'
import 'highlight.js/styles/gradient-dark.css'
import { BlogThumbnail } from '../../../types/microCMS/blog.types'

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
    <Layout home={false} thumbnail={postData.thumbnail.url}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="pt-10">
        <article>
          <h1
            className={`text-purple-600 font-bold text-5xl my-8 ${utilStyles.neon_text}`}
          >
            {postData.title}
          </h1>
          <h1 className="text-gray-700 text-1xl mb-5 pl-8 py-4 rounded-md shadow-md bg-white">
            {postData.description}
          </h1>
          <div
            className="blogBody"
            dangerouslySetInnerHTML={{ __html: postData.body }}
          />
        </article>
      </div>
    </Layout>
  )
}
