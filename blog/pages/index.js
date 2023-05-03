import Head from 'next/head'
// import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/Date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/posts')
//   const json = await response.json()

//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   }
// }

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([])
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setAllPostsData(data.allPostsData))
  // }, [])
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section style={{ padding: '1.5rem 0' }}>
        <p>깽로그의 깽입니다</p>
      </section>

      <hr />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recent posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <>
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            </>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
