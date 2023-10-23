import Head from 'next/head'
import styles from '@/components/layout.module.css'
import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

// TODO :グローバルとして定義
const name = 'もずます'
export const siteTitle = 'Mozumasu Blog'

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile_mozumasu.png"
              alt="mozumasuアイコン"
              width={300}
              height={300}
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Image
              src="/images/profile_mozumasu.png"
              alt="mozumasuアイコン"
              width={300}
              height={300}
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ</Link>
        </div>
      )}
    </div>
  )
}

export default Layout
